import { parseEnv_DOGU_DEVICE_PLATFORM_ENABLED } from '@dogu-private/dost-children';
import { DeviceConnectionState, ErrorDevice, Platform, platformFromPlatformType, PlatformSerial, PlatformType, platformTypeFromPlatform, Serial } from '@dogu-private/types';
import { DuplicatedCallGuarder, Instance, stringifyError, validateAndEmitEventAsync } from '@dogu-tech/common';
import { DefaultDeviceConnectionSubscribeReceiveMessage, DeviceConnectionSubscribe } from '@dogu-tech/device-client-common';
import { processPlatform } from '@dogu-tech/node';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { DeviceWebDriver } from '../alias';
import { AppiumService } from '../appium/appium.service';
import { BrowserManagerService } from '../browser-manager/browser-manager.service';
import { DeviceHostResignAppFileService } from '../device-host/device-host.resign-app-file';
import { DevicePortService } from '../device-port/device-port.service';
import {
  OnDeviceConnectionSubscriberConnectedEvent,
  OnDevicesConnectedEvent,
  OnDevicesConnectingEvent,
  OnDevicesDisconnectedEvent,
  OnDevicesErrorEvent,
  OnUpdateEvent,
} from '../events';
import { GamiumService } from '../gamium/gamium.service';
import { HttpRequestRelayService } from '../http-request-relay/http-request-relay.common';
import { DeviceChannel } from '../internal/public/device-channel';
import { DeviceDriver, DeviceScanResult, DeviceScanResultUnstable } from '../internal/public/device-driver';
import { createDeviceDriverFactoryByHostPlatform } from '../internal/public/device-driver-factory';
import { DoguLogger } from '../logger/logger';
import { SeleniumService } from '../selenium/selenium.service';
import { DeviceDoors } from './scan.devicedoor';

@Injectable()
export class ScanService implements OnModuleInit {
  private driverMap: Map<Platform, DeviceDriver> = new Map();
  private deviceDoors: DeviceDoors;
  private befTime = Date.now();
  private onUpdateGuarder = new DuplicatedCallGuarder();
  private scanUnstableDevices: ErrorDevice[] = [];

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly logger: DoguLogger,
    private readonly appiumService: AppiumService,
    private readonly gamiumService: GamiumService,
    private readonly httpRequestRelayService: HttpRequestRelayService,
    private readonly appiumEndpointHandlerService: DeviceWebDriver.AppiumEndpointHandlerService,
    private readonly seleniumEndpointHandlerService: DeviceWebDriver.SeleniumEndpointHandlerService,
    private readonly seleniumService: SeleniumService,
    private readonly browserManagerService: BrowserManagerService,
    private readonly devicePortService: DevicePortService,
    private readonly resignService: DeviceHostResignAppFileService,
  ) {
    this.deviceDoors = new DeviceDoors({
      onOpening: async (platformSerial: PlatformSerial): Promise<void> => {
        await validateAndEmitEventAsync(this.eventEmitter, OnDevicesConnectingEvent, { platformSerials: [platformSerial] }).catch((e) => {
          this.logger.error(`ScanService OnDevicesConnectingEvent emit error: ${stringifyError(e)}`);
        });
      },
      onError: async (errorDevice: ErrorDevice): Promise<void> => {
        await validateAndEmitEventAsync(this.eventEmitter, OnDevicesErrorEvent, { errorDevices: [errorDevice] }).catch((e) => {
          this.logger.error(`ScanService OnDevicesErrorEvent emit error: ${stringifyError(e)}`);
        });
      },
      onOpen: async (channel: DeviceChannel): Promise<void> => {
        await validateAndEmitEventAsync(this.eventEmitter, OnDevicesConnectedEvent, { channels: [channel] }).catch((e) => {
          this.logger.error(`ScanService OnDevicesConnectedEvent emit error: ${stringifyError(e)}`);
        });
      },
      onClose: async (serial: Serial): Promise<void> => {
        await validateAndEmitEventAsync(this.eventEmitter, OnDevicesDisconnectedEvent, { serials: [serial] }).catch((e) => {
          this.logger.error(`ScanService OnDevicesDisconnectedEvent emit error: ${stringifyError(e)}`);
        });
      },
    });
  }

  get channels(): Readonly<DeviceChannel[]> {
    return this.deviceDoors.channels;
  }

  private get channelsOpening(): Readonly<PlatformSerial[]> {
    return this.deviceDoors.channelsOpening;
  }

  private get channelsWithOpenError(): Readonly<ErrorDevice[]> {
    return this.deviceDoors.channelsWithError;
  }

  private get channelsWithScanError(): Readonly<ErrorDevice[]> {
    return this.scanUnstableDevices;
  }

  async onModuleInit(): Promise<void> {
    const hostPlatform = processPlatform();
    const enabledPlatforms: readonly PlatformType[] = parseEnv_DOGU_DEVICE_PLATFORM_ENABLED();
    const factory = createDeviceDriverFactoryByHostPlatform(hostPlatform, enabledPlatforms, {
      appiumService: this.appiumService,
      gamiumService: this.gamiumService,
      httpRequestRelayService: this.httpRequestRelayService,
      appiumEndpointHandlerService: this.appiumEndpointHandlerService,
      seleniumEndpointHandlerService: this.seleniumEndpointHandlerService,
      seleniumService: this.seleniumService,
      doguLogger: this.logger,
      browserManagerService: this.browserManagerService,
      devicePortService: this.devicePortService,
      resignService: this.resignService,
    });

    this.driverMap = await factory.create();
  }

  @OnEvent(OnDeviceConnectionSubscriberConnectedEvent.key)
  onDeviceConnectionSubscriberConnected(value: Instance<typeof OnDeviceConnectionSubscriberConnectedEvent.value>): void {
    const { webSocket } = value;

    const messages = [
      ...this.channelsOpening.map((platformSerial) => {
        const { platform, serial, model } = platformSerial;
        const message: Instance<typeof DeviceConnectionSubscribe.receiveMessage> = {
          ...DefaultDeviceConnectionSubscribeReceiveMessage(),
          serial,
          model,
          platform: platformFromPlatformType(platform),
          state: DeviceConnectionState.DEVICE_CONNECTION_STATE_CONNECTING,
        };
        return message;
      }),
      ...this.channelsWithOpenError.map((errorDevice) => {
        const { platform, serial, model, error } = errorDevice;
        const message: Instance<typeof DeviceConnectionSubscribe.receiveMessage> = {
          ...DefaultDeviceConnectionSubscribeReceiveMessage(),
          serial,
          model,
          platform: platformFromPlatformType(platform),
          state: DeviceConnectionState.DEVICE_CONNECTION_STATE_ERROR,
          errorMessage: error.message,
        };
        return message;
      }),
      ...this.channelsWithScanError.map((errorDevice) => {
        const { platform, serial, model, error } = errorDevice;
        const message: Instance<typeof DeviceConnectionSubscribe.receiveMessage> = {
          ...DefaultDeviceConnectionSubscribeReceiveMessage(),
          serial,
          model,
          platform: platformFromPlatformType(platform),
          state: DeviceConnectionState.DEVICE_CONNECTION_STATE_ERROR,
          errorMessage: error.message,
        };
        return message;
      }),

      ...this.channels.map((channel) => {
        const { serial, serialUnique, platform, info, isVirtual, browserInstallations } = channel;
        const { system, version, graphics } = info;
        const { model, manufacturer } = system;
        const biggestDisplay = graphics.displays.reduce((a, b) => (a.resolutionX * a.resolutionY < b.resolutionX * b.resolutionY ? b : a), { resolutionX: 0, resolutionY: 0 });
        const resolutionWidth = biggestDisplay?.resolutionX ?? 0;
        const resolutionHeight = biggestDisplay?.resolutionY ?? 0;
        const memory = `${info.memLayout.at(0)?.size ?? 0}`;
        const message: Instance<typeof DeviceConnectionSubscribe.receiveMessage> = {
          serial,
          serialUnique,
          platform,
          model,
          version,
          state: DeviceConnectionState.DEVICE_CONNECTION_STATE_CONNECTED,
          errorMessage: '',
          manufacturer,
          isVirtual: isVirtual ? 1 : 0,
          resolutionWidth,
          resolutionHeight,
          memory,
          browserInstallations,
        };
        return message;
      }),
    ];

    messages.forEach((message) => {
      webSocket.send(JSON.stringify(message));
    });
  }

  @OnEvent(OnUpdateEvent.key)
  async onUpdate(value: Instance<typeof OnUpdateEvent.value>): Promise<void> {
    await this.onUpdateGuarder.guard(async () => {
      try {
        await this.scan();
      } catch (error) {
        this.logger.error(`ScanService.update error: ${stringifyError(error)}`);
      }
    });
  }

  private async scan(): Promise<void> {
    // log for every 3 seconds
    if (Date.now() - this.befTime > 3000) {
      this.befTime = Date.now();
      this.logger.info('ScanService.update', { count: this.channels.length, serials: this.channels.map((c) => c.serial) });
    } else {
      return;
    }

    for (const [platform, driver] of this.driverMap) {
      const befChannels = this.getChannelsByPlatform(platform);
      const befSerials = befChannels.map((channel) => channel.serial);

      const scanedSerials = await Promise.resolve(driver.scanSerials()).catch((e) => {
        this.logger.error(`ScanService.update scanSerials platform: ${platform}, error: ${stringifyError(e)}`);
        return [] as DeviceScanResult[];
      });

      // notify open close
      {
        const scannedOnlineSerials = scanedSerials.filter((scanInfo) => scanInfo.status === 'online');
        const removedSerials = befSerials.filter((befSerial) => !scanedSerials.find((result) => befSerial === result.serial));
        if (removedSerials.length !== 0) {
          this.logger.info('ScanService.update removed', {
            platform,
            removedSerials,
          });
        }
        scannedOnlineSerials.forEach((result) => {
          this.deviceDoors.openIfNotActive(driver, result.serial, result.model);
        });

        removedSerials.forEach((serial) => {
          this.deviceDoors.closeDoor(driver, serial, 'Not detected by scan');
        });
      }

      // notify unstable
      {
        const scannedUnstableInfos = (scanedSerials.filter((scanInfo) => scanInfo.status === 'unstable') as DeviceScanResultUnstable[]).filter((scanInfo) => {
          const runningSerial = this.deviceDoors.channelsRunning.find((channel) => channel.serial === scanInfo.serial);
          return !runningSerial;
        });
        const befScanUnstableSerials = this.scanUnstableDevices.map((device) => device.serial);
        this.scanUnstableDevices = scannedUnstableInfos.map((scanInfo) => {
          const { serial, model, description } = scanInfo;
          return {
            serial,
            model,
            platform: platformTypeFromPlatform(platform),
            error: new Error(description),
          };
        });
        const newScanUnstableDevices = this.scanUnstableDevices.filter((device) => !befScanUnstableSerials.includes(device.serial));
        if (0 < newScanUnstableDevices.length) {
          await validateAndEmitEventAsync(this.eventEmitter, OnDevicesErrorEvent, { errorDevices: newScanUnstableDevices }).catch((e) => {
            this.logger.error(`ScanService.update OnDevicesErrorEvent emit error: ${stringifyError(e)}`);
          });
        }
      }
    }
  }

  serials(): Serial[] {
    return this.channels.map((channel) => channel.serial);
  }

  platformSerials(): PlatformSerial[] {
    return this.channels.map((channel) => {
      return {
        platform: platformTypeFromPlatform(channel.platform),
        serial: channel.serial,
        model: channel.info.system.model,
      };
    });
  }

  findChannel(serial: Serial): Readonly<DeviceChannel> | null {
    for (const channel of this.channels) {
      if (channel.serial == serial) return channel;
    }
    return null;
  }

  getChannelsByPlatform(platform: Platform): Readonly<DeviceChannel[]> {
    return this.channels.filter((channel) => channel.platform === platform).map((channel) => channel);
  }

  getDriver(platform: Platform): Readonly<DeviceDriver> | undefined {
    return this.driverMap.get(platform);
  }
}
