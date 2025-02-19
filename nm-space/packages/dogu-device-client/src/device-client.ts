import { DeviceClientOptions, DeviceCloser, DeviceWebSocket } from './bases.js';
import { errorify, stringify } from './common/functions.js';
import { WebSocketSpec } from './common/specs.js';
import { Class, Instance } from './common/types.js';
import { DeviceHttpClient } from './device-http-client.js';
import { NodeDeviceService } from './node-device-service.js';
import { AppiumCapabilities } from './specs/http/device-dtos.js';
import { Device } from './specs/http/device.js';
import { DeviceForward } from './specs/ws/device/forward.js';
import { DeviceRunAppiumServer } from './specs/ws/device/run-appium-server.js';
import { AppiumServerContext } from './types/appium.js';
import { Serial } from './types/types.js';

export class DeviceClient extends DeviceHttpClient {
  constructor(options?: DeviceClientOptions) {
    super(new NodeDeviceService(), options);
  }

  async getAppiumCapabilities(serial: Serial): Promise<AppiumCapabilities> {
    const response = await this.httpRequest(Device.getAppiumCapabilities, new Device.getAppiumCapabilities.pathProvider(serial));
    return response.capabilities;
  }

  private subscribe<S extends Class<S>, R>(
    spec: WebSocketSpec<S, R>,
    query: Record<string, unknown> | undefined,
    serial: Serial,
    callback: {
      onOpen: (deviceWebSocket: DeviceWebSocket) => void;
      onClose: (code: number, reason: string) => void;
      onMessage: (message: string) => void;
    },
  ): Promise<DeviceCloser> {
    return new Promise((resolve, reject) => {
      const { path } = spec;
      let isOpened = false;
      const deviceWebSocket = this.deviceService.connectWebSocket(
        {
          path,
          query,
        },
        serial,
        this.options,
        {
          onOpen() {
            isOpened = true;
            callback.onOpen(deviceWebSocket);
            resolve(new DeviceCloser(deviceWebSocket));
          },
          onClose(ev) {
            const { code, reason } = ev;
            callback.onClose(code, reason.toString());
            if (!isOpened) {
              reject(new Error(`Unexpected close: ${code} ${reason.toString()}`));
              return;
            }
          },
          onMessage(ev) {
            const { value } = ev;
            if (value === undefined) {
              return;
            }
            const { $case } = value;
            let stringValue = '';
            if ($case === 'bytesValue') {
              const { bytesValue } = value;
              stringValue = Buffer.from(bytesValue).toString();
            } else if ($case === 'stringValue') {
              stringValue = value.stringValue;
            } else {
              throw new Error(`Unexpected $case: ${stringify(value)}`);
            }
            callback.onMessage(stringValue);
          },
        },
      );
    });
  }

  forward(serial: Serial, hostPort: number, devicePort: number): Promise<DeviceCloser> {
    const { printable } = this.options;
    let returningClosable: DeviceCloser | null = null;
    let resolvedOrRejected = false;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        if (resolvedOrRejected) {
          return;
        }
        resolvedOrRejected = true;
        returningClosable?.close();
        reject(new Error(`Timeout to forward`));
      }, 60 * 1000);
      this.subscribe(DeviceForward, undefined, serial, {
        onOpen: (deviceServerWebSocket) => {
          const sendMessage: Instance<typeof DeviceForward.sendMessage> = {
            serial,
            hostPort,
            devicePort,
          };
          deviceServerWebSocket.send(JSON.stringify(sendMessage));
        },
        onClose: (code, reason) => {
          if (code === 1000) {
            printable.info?.(`Forward closed`, { code, reason });
            return;
          }
          if (resolvedOrRejected) {
            return;
          }
          reject(new Error(`Forward closed code: ${code}, reason: ${reason}`));
        },
        onMessage: (message) => {
          const parsed = JSON.parse(message) as Instance<typeof DeviceForward.receiveMessage>;
          const { value } = parsed;
          const { kind } = value;
          if (kind === 'DeviceForwardReceiveMessageLogValue') {
            // noop
          } else if (kind === 'DeviceForwardReceiveMessageResultValue') {
            const { success } = value;
            if (success) {
              if (returningClosable === null) {
                throw new Error(`Unexpected returningClosable`);
              }
              clearTimeout(timeout);
              if (resolvedOrRejected) {
                return;
              }
              resolvedOrRejected = true;
              resolve(returningClosable);
            } else {
              clearTimeout(timeout);
              if (resolvedOrRejected) {
                return;
              }
              resolvedOrRejected = true;
              returningClosable?.close();
              reject(new Error(`Failed to forward`));
            }
          } else {
            throw new Error(`Unexpected kind: ${stringify(kind)}`);
          }
        },
      })
        .then((closable) => {
          returningClosable = closable;
        })
        .catch((error) => {
          returningClosable = null;
          printable.error?.(`Failed to forward`, { error: errorify(error) });
        });
    });
  }

  runAppiumServer(serial: Serial): Promise<AppiumServerContext> {
    const { printable } = this.options;
    let returningClosable: DeviceCloser | null = null;
    let resolvedOrRejected = false;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        if (resolvedOrRejected) {
          return;
        }
        resolvedOrRejected = true;
        returningClosable?.close();
        reject(new Error(`Timeout to runAppiumServer`));
      }, 300 * 1000);
      this.subscribe(DeviceRunAppiumServer, undefined, serial, {
        onOpen: (deviceServerWebSocket) => {
          const sendMessage: Instance<typeof DeviceRunAppiumServer.sendMessage> = {
            serial,
          };
          deviceServerWebSocket.send(JSON.stringify(sendMessage));
        },
        onClose: (code, reason) => {
          if (code === 1000) {
            printable.info?.(`Forward closed`, { code, reason });
            return;
          }
          if (resolvedOrRejected) {
            return;
          }
          reject(new Error(`RunAppiumServer closed code: ${code}, reason: ${reason}`));
        },
        onMessage: (message) => {
          const parsed = JSON.parse(message) as Instance<typeof DeviceRunAppiumServer.receiveMessage>;
          const { value } = parsed;
          const { kind } = value;
          if (kind === 'DeviceRunAppiumServerReceiveMessageLogValue') {
            // noop
          } else if (kind === 'DeviceRunAppiumServerReceiveMessageResultValue') {
            const { success } = value;
            if (success) {
              if (returningClosable === null) {
                throw new Error(`Unexpected returningClosable`);
              }
              clearTimeout(timeout);
              if (resolvedOrRejected) {
                return;
              }
              resolvedOrRejected = true;
              resolve(new AppiumServerContext({ port: value.serverPort }, returningClosable));
            } else {
              clearTimeout(timeout);
              if (resolvedOrRejected) {
                return;
              }
              resolvedOrRejected = true;
              returningClosable?.close();
              reject(new Error(`Failed to runAppiumServer`));
            }
          } else {
            throw new Error(`Unexpected kind: ${stringify(kind)}`);
          }
        },
      })
        .then((closable) => {
          returningClosable = closable;
        })
        .catch((error) => {
          returningClosable = null;
          printable.error?.(`Failed to runAppiumServer`, { error: errorify(error) });
        });
    });
  }
}
