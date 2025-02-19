import {
  CodeUtil,
  DeviceAlert,
  DeviceFoldStatus,
  DeviceSystemInfo,
  DeviceWindowInfo,
  ErrorResult,
  FilledRuntimeInfo,
  findDeviceModelNameByModelId,
  GeoLocation,
  LocaleCode,
  Platform,
  PrivateProtocol,
  ProfileMethod,
  RuntimeInfo,
  ScreenRecordOption,
  Serial,
  SerialPrintable,
  StreamingAnswer,
} from '@dogu-private/types';
import { Closable, errorify, MixedLogger, Printable, PromiseOrValue, stringify, TimedCacheAsync } from '@dogu-tech/common';
import { AppiumCapabilities, BrowserInstallation, StreamingOfferDto } from '@dogu-tech/device-client-common';
import { checkTime, CheckTimer, ChildProcessError, killChildProcess } from '@dogu-tech/node';
import { ChildProcess } from 'child_process';
import compressing from 'compressing';
import fs from 'fs';
import path from 'path';
import { Observable } from 'rxjs';
import semver from 'semver';
import { createAppiumCapabilities } from '../../appium/appium.capabilites';
import { AppiumContext } from '../../appium/appium.context';
import { AppiumContextProxy, AppiumRemoteContextRental } from '../../appium/appium.context.proxy';
import { AppiumDeviceWebDriverHandler } from '../../device-webdriver/appium.device-webdriver.handler';
import { DeviceWebDriverHandler } from '../../device-webdriver/device-webdriver.common';
import { env } from '../../env';
import { GamiumContext } from '../../gamium/gamium.context';
import { deviceInfoLogger } from '../../logger/logger.instance';
import { createGdcLogger, createIosLogger } from '../../logger/serial-logger.instance';
import { config } from '../config';
import { IosDriver } from '../driver/ios-driver';
import { IdeviceDiagnostics, IdeviceSyslog, MobileDevice } from '../externals';
import { IdeviceInstaller } from '../externals/cli/ideviceinstaller';
import { IosDeviceAgentProcess } from '../externals/cli/ios-device-agent';
import { ZombieTunnel } from '../externals/cli/mobiledevice-tunnel';
import { WebdriverAgentProcess } from '../externals/cli/webdriver-agent-process';
import { IosWebDriver, IosWebDriverInfo } from '../externals/webdriver/ios-webdriver';
import { DeviceChannel, DeviceChannelOpenParam, DeviceHealthStatus, DeviceServerService, LogHandler } from '../public/device-channel';
import { IosDeviceAgentService } from '../services/device-agent/ios-device-agent-service';
import { IosDisplayProfileService, IosProfileService } from '../services/profile/ios-profiler';
import { ProfileServices } from '../services/profile/profile-service';
import { IosResetService } from '../services/reset/ios-reset';
import { IosSharedDeviceService } from '../services/shared-device/ios-shared-device';
import { PionStreamingService } from '../services/streaming/pion-streaming-service';
import { IosSystemInfoService } from '../services/system-info/ios-system-info-service';
import { Zombieable } from '../services/zombie/zombie-component';
import { ZombieServiceInstance } from '../services/zombie/zombie-service';

type DeviceControl = PrivateProtocol.DeviceControl;

export class IosLogClosable implements Closable {
  constructor(
    private readonly childProcess: ChildProcess,
    private readonly printable?: Printable,
  ) {}

  close(): void {
    killChildProcess(this.childProcess).catch((error) => {
      this.printable?.error?.('IosLogClosable close failed.', { error: errorify(error) });
    });
  }
}

export class IosChannel implements DeviceChannel {
  private tunnels: ZombieTunnel[] = [];
  private _gamiumContext: GamiumContext | null = null;
  private _alertCache: TimedCacheAsync<DeviceAlert | undefined>;

  constructor(
    private readonly _serial: Serial,
    private readonly _info: DeviceSystemInfo,
    private readonly _profilers: ProfileServices,
    private readonly streaming: PionStreamingService,
    private webdriverAgentProcess: WebdriverAgentProcess,
    private iosDeviceAgentProcess: IosDeviceAgentProcess,
    private readonly deviceAgent: IosDeviceAgentService,
    private _appiumContext: AppiumContextProxy,
    private readonly _appiumDeviceWebDriverHandler: AppiumDeviceWebDriverHandler,
    private readonly _sharedDevice: IosSharedDeviceService,
    private readonly _reset: IosResetService,
    private readonly logger: SerialPrintable,
    readonly browserInstallations: BrowserInstallation[],
  ) {
    this.logger.info(`IosChannel created: ${this.serial}`);
    this._alertCache = new TimedCacheAsync<DeviceAlert | undefined>({ milliseconds: 300 });
  }

  get serial(): Serial {
    return this._serial;
  }

  get serialUnique(): string {
    return this._serial;
  }

  get platform(): Platform {
    return Platform.PLATFORM_IOS;
  }

  get info(): DeviceSystemInfo {
    return this._info;
  }

  get isVirtual(): boolean {
    return this._info.isVirtual;
  }

  static async create(param: DeviceChannelOpenParam, deviceServerService: DeviceServerService): Promise<IosChannel> {
    ZombieServiceInstance.deleteAllComponentsIfExist((zombieable: Zombieable): boolean => {
      return zombieable.serial === param.serial && zombieable.platform === Platform.PLATFORM_IOS;
    }, 'kill previous zombie');

    const { serial } = param;
    const platform = Platform.PLATFORM_IOS;

    const logger = createIosLogger(param.serial);
    const timer = new CheckTimer({ logger, logOnStart: true, logOnEnd: true });

    const productVersion = await IosSystemInfoService.getVersion(serial, logger);

    await timer.check(
      `IosChannel.create.validation`,
      (async (): Promise<void> => {
        if (semver.lt(productVersion, '14.0.0')) {
          throw new Error(`iOS version must be 14 or higher. current version: ${productVersion.inspect()}`);
        }

        const isWdaReady = await WebdriverAgentProcess.isReady(serial);
        if (isWdaReady === 'build not found') {
          throw new Error(`WebDriverAgent can't be executed on this device. Please build WebDriverAgent.xcodeproj.`);
        }
        if (isWdaReady === 'device not registered') {
          throw new Error(
            `WebDriverAgent can't be executed on this device. Please register your device. reference: https://developer.apple.com/help/account/register-devices/register-a-single-device.`,
          );
        }
        const isIdaReady = await IosDeviceAgentProcess.isReady(serial);
        if (isIdaReady === 'build not found') {
          throw new Error(`iOSDeviceAgent can't be executed on this device. Please build iOSDeviceAgent.xcodeproj.`);
        }
        if (isIdaReady === 'device not registered') {
          throw new Error(
            `iOSDeviceAgent can't be executed on this device. Please register your device. reference: https://developer.apple.com/help/account/register-devices/register-a-single-device.`,
          );
        }

        if (!env.DOGU_DEVICE_IOS_IS_IDAPROJECT_VALIDATED) {
          throw new Error('iOSDeviceAgent build is not latest. Please clean and build iOSDeviceAgent.xcodeproj');
        }
      })(),
    );

    await timer.check('IosChannel.create.restartIfAvailiable', IosChannel.restartIfAvailiable(serial, logger));

    const wdaForwardPort = await deviceServerService.devicePortService.createOrGetHostPort(serial, 'WebdriverAgentForward');
    const isIpad = await MobileDevice.getProductType(serial, logger).then((type) => type?.startsWith('iPad'));
    const iosWdInfo = new IosWebDriverInfo(isIpad, productVersion);

    const wda = await timer.check('IosChannel.create.WebdriverAgentProcess.start', WebdriverAgentProcess.start(serial, wdaForwardPort, logger));

    const appiumContextProxy = await timer.check(
      'IosChannel.create.AppiumContextProxy.create',
      (async (): Promise<AppiumContextProxy> => {
        const appiumContextProxy = deviceServerService.appiumService.createIosAppiumContext(
          serial,
          'builtin',
          await deviceServerService.devicePortService.createOrGetHostPort(serial, 'iOSAppiumServer'),
          wdaForwardPort,
        );
        const appiumWaiter = ZombieServiceInstance.addComponent(appiumContextProxy);
        await appiumWaiter.waitUntilAlive({ maxReviveCount: 100 });
        return appiumContextProxy;
      })(),
    );

    await timer.check(
      'IosChannel.create.checkWdaLocationPermission',
      (async (): Promise<void> => {
        const geoLocation = await wda.getGeoLocation();
        if (3 === geoLocation.authorizationStatus) {
          return;
        }

        const driver = appiumContextProxy.driver();
        if (!driver) {
          throw new Error(`IosChannel.create.checkWdaLocationPermission driver is null`);
        }
        const iosDriver = new IosWebDriver(driver, wda, iosWdInfo, logger);
        await iosDriver.setWdaLocationPermissionAlways();
      })(),
    );

    const reset = new IosResetService(serial, iosWdInfo, logger);

    const shared = await timer.check(
      'IosChannel.create.IosSharedDeviceService.start',
      (async (): Promise<IosSharedDeviceService> => {
        const appiumContextImpl = await appiumContextProxy.waitUntilBuiltin();
        const shared = new IosSharedDeviceService(serial, wda, reset, appiumContextImpl, iosWdInfo, logger);
        await shared.setup();
        await shared.wait();
        return shared;
      })(),
    );

    const screenForwardPort = await deviceServerService.devicePortService.createOrGetHostPort(serial, 'iOSScreenForward');
    const grpcForwardPort = await deviceServerService.devicePortService.createOrGetHostPort(serial, 'iOSGrpcForward');
    const deviceAgent = new IosDeviceAgentService(serial, screenForwardPort, grpcForwardPort, logger);
    const streaming = await PionStreamingService.create(serial, Platform.PLATFORM_IOS, env.DOGU_DEVICE_SERVER_PORT, createGdcLogger(serial));
    const iosDeviceAgentProcess = await timer.check(
      'IosChannel.create.IosDeviceAgentProcess.start',
      IosDeviceAgentProcess.start(
        serial,
        screenForwardPort,
        deviceServerService.devicePortService.getIosDeviceAgentScreenServerPort(),
        grpcForwardPort,
        deviceServerService.devicePortService.getIosDeviceAgentGrpcServerPort(),
        wda,
        deviceServerService.devicePortService.getIosDeviceAgentWebDriverAgentServerPort(),
        deviceAgent,
        streaming,
        reset,
        logger,
      ),
    );
    await timer.check('IosChannel.create.IosDeviceAgentService.wait', deviceAgent.wait());

    const systemInfoService = new IosSystemInfoService(deviceAgent, logger);
    const systemInfo = await timer.check('IosChannel.create.IosSystemInfoService.createSystemInfo', systemInfoService.createSystemInfo(serial));
    deviceInfoLogger.info('iOSChannel.create', { serial, systemInfo, modelName: findDeviceModelNameByModelId(systemInfo.system.model) });

    const appiumDeviceWebDriverHandler = new AppiumDeviceWebDriverHandler(
      platform,
      serial,
      appiumContextProxy,
      deviceServerService.httpRequestRelayService,
      deviceServerService.appiumEndpointHandlerService,
      deviceServerService.doguLogger,
    );

    const findAllBrowserInstallationsResult = await deviceServerService.browserManagerService.findAllBrowserInstallations({
      deviceSerial: serial,
      browserPlatform: 'ios',
    });

    const deviceChannel = new IosChannel(
      serial,
      systemInfo,
      [new IosProfileService(deviceAgent), new IosDisplayProfileService(iosDeviceAgentProcess)],
      streaming,
      wda,
      iosDeviceAgentProcess,
      deviceAgent,
      appiumContextProxy,
      appiumDeviceWebDriverHandler,
      shared,
      reset,
      logger,
      findAllBrowserInstallationsResult.browserInstallations,
    );

    logger.verbose('streaming service calling deviceConnected');
    await Promise.resolve(
      streaming.deviceConnected(serial, {
        serial,
        platform: Platform.PLATFORM_IOS,
        screenUrl: deviceAgent.screenUrl,
        inputUrl: deviceAgent.inputUrl,
        screenWidth: 0 < systemInfo.graphics.displays.length ? systemInfo.graphics.displays[0].resolutionX : 0,
        screenHeight: 0 < systemInfo.graphics.displays.length ? systemInfo.graphics.displays[0].resolutionY : 0,
      }),
    ).catch((error) => {
      logger.error('StreamingService deviceConnected failed.', { error: errorify(error) });
      throw error;
    });
    logger.verbose('streaming service called deviceConnected');

    logger.verbose('gamium context starting');
    const gamiumContext = deviceServerService.gamiumService.openGamiumContext(deviceChannel);
    deviceChannel.gamiumContext = gamiumContext;
    logger.verbose('gamium context started');

    return deviceChannel;
  }

  static async restartIfAvailiable(serial: Serial, logger: Printable): Promise<void> {
    logger.info('IosChannel restartIfAvailiable', { on: env.DOGU_DEVICE_RESTART_IOS_ON_INIT });
    if (config.externalIosDeviceAgent.use) {
      return;
    }
    if (!(await IosResetService.isDirty(serial))) {
      return;
    }
    if (env.DOGU_DEVICE_RESTART_IOS_ON_INIT) {
      await IdeviceDiagnostics.restart(serial, logger);
      try {
        await IosDriver.waitUntilDisonnected(serial);
        await IosDriver.waitUntilConnected(serial);
      } catch {
        throw new Error(`Device ${serial} is not found after restart. Please check the usb connection.`);
      }
    }
  }

  async close(): Promise<void> {
    this.logger.info(`IosChannel closed: ${this.serial}`);
    this.tunnels.forEach((tunnel) => {
      ZombieServiceInstance.deleteComponent(tunnel, `IosChannel closed: ${this.serial}`);
    });
    await this._gamiumContext?.close().catch((error) => {
      this.logger.error('ios gamium context close failed.', { error: errorify(error) });
    });
    /**
     * @note Does not wait for appium to shutdown
     */
    ZombieServiceInstance.deleteComponent(this._appiumContext);
    this.webdriverAgentProcess.delete();
    this.iosDeviceAgentProcess.delete();
    this.deviceAgent.delete();
    this._sharedDevice.delete();
    ZombieServiceInstance.deleteAllComponentsIfExist((zombieable: Zombieable): boolean => {
      return zombieable.serial === this.serial && zombieable.platform === Platform.PLATFORM_IOS;
    }, 'kill serial bound zombies');
  }

  async queryProfile(methods: ProfileMethod[] | ProfileMethod): Promise<FilledRuntimeInfo> {
    const methodList = Array.isArray(methods) ? methods : [methods];
    const results = await Promise.allSettled(this._profilers.map(async (profiler) => profiler.profile(methodList)));
    const result = results.reduce((acc, result) => {
      if (result.status === 'fulfilled') {
        Object.keys(acc).forEach((key) => {
          const accDesc = Object.getOwnPropertyDescriptor(acc, key);
          const resultDesc = Object.getOwnPropertyDescriptor(result.value, key);
          if (!accDesc || !Array.isArray(accDesc?.value) || accDesc.value.length !== 0 || !resultDesc || !Array.isArray(resultDesc?.value)) {
            return;
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          accDesc.value.push(...resultDesc.value);
        });
        return acc;
      } else {
        this.logger.error('profile failed.', { serial: this.serial, reason: result.reason });
        return acc;
      }
    }, RuntimeInfo.fromPartial({}));
    return {
      ...result,
      platform: Platform.PLATFORM_ANDROID,
      localTimeStamp: new Date(),
    };
  }

  async startStreamingWebRtcWithTrickle(offer: StreamingOfferDto): Promise<Observable<StreamingAnswer>> {
    return Promise.resolve(this.streaming.startStreamingWithTrickle(this.serial, offer));
  }

  async startRecord(option: ScreenRecordOption): Promise<ErrorResult> {
    const displays = this._info.graphics.displays;
    const maxResolution = option.screen?.maxResolution ?? 720;

    const screenWidth = 0 < displays.length ? displays[0].resolutionX : 720;
    const screenHeight = 0 < displays.length ? displays[0].resolutionY : 1280;
    this.logger.debug?.(`screenWidth: ${screenWidth}, screenHeight: ${screenHeight}`);

    const longer = Math.max(screenWidth, screenHeight);
    const shorter = Math.min(screenWidth, screenHeight);
    const multiplier = maxResolution / shorter;

    const longerScaled = Math.ceil(longer * multiplier) % 2 === 0 ? Math.ceil(longer * multiplier) : Math.ceil(longer * multiplier) + 1;
    const shorterScaled = maxResolution;
    return Promise.resolve(
      this.streaming.startRecord(this.serial, {
        ...option,
        // etcParam: `-vf scale='w=${longer}:h=${shorter}':'force_original_aspect_ratio=1',pad='${longer}:${shorter}':'(ow-iw)/2':'(oh-ih)/2' -c:v libvpx -copyts`,
        etcParam: `-movflags +faststart -vf scale='w=${longerScaled}:h=${shorterScaled}':'force_original_aspect_ratio=1',pad='${longerScaled}:${shorterScaled}':'(ow-iw)/2':'(oh-ih)/2' -c:v libx264`,
      }),
    );
  }

  async stopRecord(filePath: string): Promise<ErrorResult> {
    return Promise.resolve(this.streaming.stopRecord(this.serial, filePath));
  }

  control(control: DeviceControl): void {
    throw new Error('Method not implemented.');
  }

  turnScreen(isOn: boolean): void {
    throw new Error('Method not implemented.');
  }

  getFoldStatus(): DeviceFoldStatus {
    throw new Error('Method not implemented.');
  }

  fold(fold: boolean): void {
    throw new Error('Method not implemented.');
  }

  async reboot(): Promise<void> {
    this.logger.verbose?.(`IosChannel.reboot ${this.serial}`);
    await IdeviceDiagnostics.restart(this.serial, this.logger);
  }

  checkHealth(): DeviceHealthStatus {
    return { isHealthy: true, message: '' };
  }

  killOnPort(port: number): void {
    this.logger.warn?.('IosChannel.killOnPort is not implemented yet');
  }

  async forward(hostPort: number, devicePort: number, handler: LogHandler): Promise<void> {
    const { serial } = this;
    const logger = new MixedLogger([this.logger, handler]);
    const tunnel = this.tunnels.find((t) => t.devicePort === devicePort);
    if (tunnel) {
      this.logger.warn?.(
        `IosChannel.forward: ${devicePort} is already forwarded, so kill previous forward.(from ${tunnel.hostPort} to ${devicePort}). new forward is ${hostPort} to ${devicePort}`,
      );
      this.unforward(tunnel.hostPort);
    }

    const newTunnel = new ZombieTunnel(serial, 'forward', hostPort, devicePort, logger);
    this.tunnels.push(newTunnel);
    await newTunnel.zombieWaiter.waitUntilAlive({ maxReviveCount: 10 });
  }

  unforward(hostPort: number): void {
    const tunnel = this.tunnels.find((t) => t.hostPort === hostPort);
    if (tunnel) {
      ZombieServiceInstance.deleteComponent(tunnel, `unforward called: ${this.serial}`);
      this.tunnels = this.tunnels.filter((t) => t.hostPort !== hostPort);
    }
  }

  async isPortListening(port: number): Promise<boolean> {
    const res = await this.deviceAgent.send('dcIdaIsPortListeningParam', 'dcIdaIsPortListeningResult', { port });
    return res?.isListening ?? false;
  }

  getWindows(): DeviceWindowInfo[] {
    return [];
  }

  private async findDotAppPath(appPath: string): Promise<string> {
    if (!appPath.endsWith('.ipa')) {
      throw new Error('appPath must be ipa');
    }

    const unzipDesetPath = appPath.substring(0, appPath.length - 4);
    try {
      await fs.promises.access(unzipDesetPath, fs.constants.F_OK);
    } catch {
      await compressing.zip.uncompress(appPath, unzipDesetPath);
    }

    const payloadPath = path.resolve(unzipDesetPath, 'Payload');
    const files = await fs.promises.readdir(payloadPath);
    for (const file of files) {
      if (file.endsWith('.app')) {
        return path.resolve(payloadPath, file);
      }
    }

    throw new Error('not found .app');
  }

  async uninstallApp(appPath: string, handler: LogHandler): Promise<void> {
    const logger = new MixedLogger([this.logger, handler]);
    const installer = new IdeviceInstaller(this.serial, logger);
    const dotAppPath = await this.findDotAppPath(appPath);
    const appName = await MobileDevice.getBundleId(dotAppPath, logger);
    await installer.uninstallApp(appName);
  }

  async installApp(appPath: string, handler: LogHandler): Promise<void> {
    const logger = new MixedLogger([this.logger, handler]);
    const installer = new IdeviceInstaller(this.serial, logger);

    const result = await installer.installApp(appPath).catch((error) => {
      if (!(error instanceof ChildProcessError)) {
        throw error;
      }
      const logInfos = error.bufferLogger?.sortedLogInfos() ?? [];
      if (logInfos.find((log) => stringify(log.message).includes('MismatchedApplicationIdentifierEntitlement'))) {
        return { errorType: 'MismatchedApplicationIdentifierEntitlement' };
      }
      throw error;
    });
    if ('errorType' in result && result.errorType === 'MismatchedApplicationIdentifierEntitlement') {
      await this.uninstallApp(appPath, handler);
      await installer.installApp(appPath);
    }
  }

  async runApp(appPath: string, handler: LogHandler): Promise<void> {
    const { serial } = this;
    const logger = new MixedLogger([this.logger, handler]);
    const installedAppNames = await MobileDevice.listApps(serial, logger);
    const dotAppPath = await this.findDotAppPath(appPath);
    const bundleId = await MobileDevice.getBundleId(dotAppPath, logger);
    const result = await this.deviceAgent.send('dcIdaRunappParam', 'dcIdaRunappResult', {
      appPath,
      installedAppNames,
      bundleId,
    });
    if (!result) {
      throw new Error('runApp failed: result is null');
    }
    if (CodeUtil.isNotSuccess(result.error?.code)) {
      throw new Error(`runApp failed: ${stringify(result.error)}`);
    }
  }

  subscribeLog(args: string[], handler: LogHandler): PromiseOrValue<Closable> {
    const { serial, logger } = this;
    const child = IdeviceSyslog.logcat(serial, args, handler, logger);
    return new IosLogClosable(child, logger);
  }

  async reset(): Promise<void> {
    const { logger, webdriverAgentProcess } = this;
    await this.deviceAgent.send('dcIdaSwitchInputBlockParam', 'dcIdaSwitchInputBlockResult', { isBlock: false });
    this.iosDeviceAgentProcess.delete();
    ZombieServiceInstance.deleteComponent(this.deviceAgent);
    const appiumContextImpl = await checkTime(`IosChannel.reset.waitUntilBuiltin`, this._appiumContext.waitUntilBuiltin(), { logger });
    await checkTime(`IosChannel.reset.reset`, this._reset.reset(appiumContextImpl, webdriverAgentProcess), { logger });
  }

  joinWifi(ssid: string, password: string): PromiseOrValue<void> {
    throw new Error('Method not implemented.');
  }

  getAppiumContext(): AppiumContext {
    return this._appiumContext;
  }

  async rentAppiumRemoteContext(reason: string): Promise<AppiumRemoteContextRental> {
    return this._appiumContext.rentRemote(reason);
  }

  async getAppiumCapabilities(): Promise<AppiumCapabilities> {
    return await createAppiumCapabilities(this._appiumContext.options, this.logger);
  }

  set gamiumContext(context: GamiumContext | null) {
    if (this._gamiumContext) {
      throw new Error('Gamium context is already set');
    }
    this._gamiumContext = context;
  }

  get gamiumContext(): GamiumContext | null {
    return this._gamiumContext;
  }

  getWebDriverHandler(): DeviceWebDriverHandler | null {
    return this._appiumDeviceWebDriverHandler;
  }

  async getLocale(): Promise<LocaleCode> {
    throw new Error('Method not implemented.');
  }

  async setLocale(localeCode: LocaleCode): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getGeoLocation(): Promise<GeoLocation> {
    const { _appiumContext: appiumContext } = this;
    const driver = appiumContext.driver();
    if (!driver) {
      throw new Error(`IosResetService.clearSafariCache driver is null`);
    }
    const location = await driver.getGeoLocation();
    return location as GeoLocation;
  }

  async setGeoLocation(geoLocation: GeoLocation): Promise<void> {
    const { _appiumContext: appiumContext } = this;
    const driver = appiumContext.driver();
    if (!driver) {
      throw new Error(`IosResetService.clearSafariCache driver is null`);
    }
    await driver.setGeoLocation(geoLocation);
  }

  async getAlert(): Promise<DeviceAlert | undefined> {
    return await this._alertCache.update({
      call: async () => {
        const result = await this.deviceAgent.send('dcIdaQueryAlertParam', 'dcIdaQueryAlertResult', {});
        if (!result) {
          return undefined;
        }
        if (!result.isShow) {
          return undefined;
        }
        return {
          title: result.title,
        };
      },
      onCached: () => {},
    });
  }

  async getScreenshot(): Promise<string> {
    return await this.webdriverAgentProcess.screenshot();
  }
}
