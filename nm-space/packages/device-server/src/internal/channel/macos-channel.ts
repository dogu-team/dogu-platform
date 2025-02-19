import {
  DefaultDeviceSystemInfo,
  DeviceAlert,
  DeviceFoldStatus,
  DeviceSystemInfo,
  DeviceWindowInfo,
  ErrorResult,
  FilledRuntimeInfo,
  GeoLocation,
  LocaleCode,
  Platform,
  PrivateProtocol,
  ProfileMethod,
  RuntimeInfo,
  ScreenRecordOption,
  Serial,
  StreamingAnswer,
} from '@dogu-private/types';
import { Closable, PromiseOrValue, stringify } from '@dogu-tech/common';
import { BrowserInstallation, StreamingOfferDto } from '@dogu-tech/device-client-common';
import { CheckTimer, ChildProcess, isFreePort } from '@dogu-tech/node';
import { Observable } from 'rxjs';
import systeminformation from 'systeminformation';
import { AppiumRemoteContextRental } from '../../appium/appium.context.proxy';
import { DeviceWebDriverHandler } from '../../device-webdriver/device-webdriver.common';
import { SeleniumDeviceWebDriverHandler } from '../../device-webdriver/selenium.device-webdriver.handler';
import { env } from '../../env';
import { GamiumContext } from '../../gamium/gamium.context';
import { deviceInfoLogger, logger } from '../../logger/logger.instance';
import { createGdcLogger } from '../../logger/serial-logger.instance';
import { DesktopCapturer } from '../externals/index';
import { DeviceChannel, DeviceChannelOpenParam, DeviceHealthStatus, DeviceServerService, LogHandler } from '../public/device-channel';
import { DeviceAgentService } from '../services/device-agent/device-agent-service';
import { NullDeviceAgentService } from '../services/device-agent/null-device-agent-service';
import { DesktopProfileService } from '../services/profile/desktop-profiler';
import { ProfileService } from '../services/profile/profile-service';
import { PionStreamingService } from '../services/streaming/pion-streaming-service';

type DeviceControl = PrivateProtocol.DeviceControl;

export class MacosChannel implements DeviceChannel {
  constructor(
    private readonly _serial: Serial,
    private readonly _info: DeviceSystemInfo,
    private readonly _profile: ProfileService,
    private readonly _streaming: PionStreamingService,
    private readonly _deviceAgent: DeviceAgentService,
    private readonly _seleniumDeviceWebDriverHandler: SeleniumDeviceWebDriverHandler,
    readonly browserInstallations: BrowserInstallation[],
  ) {}

  get serial(): Serial {
    return this._serial;
  }

  get serialUnique(): string {
    return this._serial;
  }

  get platform(): Platform {
    return Platform.PLATFORM_MACOS;
  }

  get info(): DeviceSystemInfo {
    return this._info;
  }

  get isVirtual(): boolean {
    return this._info.isVirtual;
  }

  static async create(param: DeviceChannelOpenParam, deviceServerService: DeviceServerService): Promise<DeviceChannel> {
    const platform = Platform.PLATFORM_MACOS;
    const deviceAgent = new NullDeviceAgentService();

    const timer = new CheckTimer({ logger });

    const osInfo = await timer.check('os', systeminformation.osInfo());
    const info: DeviceSystemInfo = {
      ...DefaultDeviceSystemInfo(),
      nickname: osInfo.hostname,
      version: osInfo.release,
      system: await timer.check('system', systeminformation.system()),
      os: { ...osInfo, platform },
      uuid: await timer.check('uuid', systeminformation.uuid()),
      cpu: await timer.check('cpu', systeminformation.cpu()),
    };
    deviceInfoLogger.info('macOSChannel.create', { info });
    const streaming = await PionStreamingService.create(param.serial, Platform.PLATFORM_MACOS, env.DOGU_DEVICE_SERVER_PORT, createGdcLogger(param.serial));
    await streaming.deviceConnected(param.serial, {
      serial: param.serial,
      platform,
      screenUrl: deviceAgent.screenUrl,
      inputUrl: deviceAgent.inputUrl,
      screenWidth: 0 < info.graphics.displays.length ? info.graphics.displays[0].resolutionX : 0,
      screenHeight: 0 < info.graphics.displays.length ? info.graphics.displays[0].resolutionY : 0,
    });
    const seleniumDeviceWebDriverHandler = new SeleniumDeviceWebDriverHandler(
      platform,
      param.serial,
      deviceServerService.seleniumService,
      deviceServerService.httpRequestRelayService,
      deviceServerService.seleniumEndpointHandlerService,
      deviceServerService.browserManagerService,
      deviceServerService.doguLogger,
    );

    const deviceChannel = new MacosChannel(param.serial, info, new DesktopProfileService(param.serial, logger), streaming, deviceAgent, seleniumDeviceWebDriverHandler, []);
    return Promise.resolve(deviceChannel);
  }

  async queryProfile(methods: ProfileMethod[] | ProfileMethod): Promise<FilledRuntimeInfo> {
    const methodList = Array.isArray(methods) ? methods : [methods];
    const result = await this._profile.profile(methodList);
    return {
      ...RuntimeInfo.fromPartial(result),
      platform: Platform.PLATFORM_MACOS,
      localTimeStamp: new Date(),
    };
  }

  async startStreamingWebRtcWithTrickle(offer: StreamingOfferDto): Promise<Observable<StreamingAnswer>> {
    return Promise.resolve(this._streaming.startStreamingWithTrickle(this.serial, offer));
  }

  async startRecord(option: ScreenRecordOption): Promise<ErrorResult> {
    return Promise.resolve(this._streaming.startRecord(this.serial, option));
  }

  async stopRecord(filePath: string): Promise<ErrorResult> {
    return Promise.resolve(this._streaming.stopRecord(this.serial, filePath));
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

  reboot(): void {
    throw new Error('Method not implemented.');
  }

  checkHealth(): DeviceHealthStatus {
    return { isHealthy: true, message: '' };
  }

  async killOnPort(port: number): Promise<void> {
    await ChildProcess.exec(`lsof -i tcp:${port} | grep LISTEN | awk '{print $2}' | xargs kill -9`, {});
  }

  forward(hostPort: number, devicePort: number, handler: LogHandler): void {
    // noop
  }

  unforward(hostPort: number): void {
    // noop
  }

  async isPortListening(port: number): Promise<boolean> {
    const isFree = await isFreePort(port);
    return !isFree;
  }

  async getWindows(): Promise<DeviceWindowInfo[]> {
    return await DesktopCapturer.getWindows(logger);
  }

  uninstallApp(appPath: string, handler: LogHandler): void {
    throw new Error('Method not implemented.');
  }

  installApp(appPath: string, handler: LogHandler): void {
    throw new Error('Method not implemented.');
  }

  runApp(appPath: string, handler: LogHandler): void {
    ChildProcess.spawn(appPath, [], {}, logger).catch((err) => {
      logger.error(`failed to start app`, { error: stringify(err) });
    });
  }

  subscribeLog(args: string[], handler: LogHandler): PromiseOrValue<Closable> {
    throw new Error('Method not implemented.');
  }

  reset(): PromiseOrValue<void> {
    throw new Error('Method not implemented.');
  }

  joinWifi(ssid: string, password: string): PromiseOrValue<void> {
    throw new Error('Method not implemented.');
  }

  getAppiumContext(): null {
    return null;
  }

  async rentAppiumRemoteContext(reason: string): Promise<AppiumRemoteContextRental> {
    throw new Error('Method not implemented.');
    await Promise.resolve();
  }

  getAppiumCapabilities(): null {
    return null;
  }

  set gamiumContext(context: GamiumContext | null) {
    throw new Error('Method not implemented.');
  }

  get gamiumContext(): GamiumContext | null {
    return null;
  }

  getWebDriverHandler(): DeviceWebDriverHandler | null {
    return this._seleniumDeviceWebDriverHandler;
  }

  async getLocale(): Promise<LocaleCode> {
    throw new Error('Method not implemented.');
  }

  async setLocale(localeCode: LocaleCode): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getGeoLocation(): Promise<GeoLocation> {
    throw new Error('Method not implemented.');
  }

  async setGeoLocation(geoLocation: GeoLocation): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async getAlert(): Promise<DeviceAlert | undefined> {
    throw new Error('Method not implemented.');
    await Promise.resolve();
  }

  async getScreenshot(): Promise<string> {
    throw new Error('Method not implemented.');
    await Promise.resolve();
  }
}
