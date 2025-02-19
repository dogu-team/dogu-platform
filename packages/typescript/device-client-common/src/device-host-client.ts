import { closeWebSocketWithTruncateReason, errorify, Instance, stringify, transformAndValidate, WebSocketSpec } from '@dogu-tech/common';
import { DeviceTemporaryToken, Serial, ThirdPartyPathMap } from '@dogu-tech/types';
import { DeviceAuth } from '.';
import { DeviceClientOptions, DeviceCloser, DeviceService, DeviceWebSocket } from './bases';
import { DeviceHttpClient } from './device-http-client';
import { DeviceHost } from './specs/http/device-host';
import { DeviceHostDownloadSharedResource } from './specs/ws/device-host/download-shared-resource';

export class DeviceHostClient extends DeviceHttpClient {
  constructor(deviceService: DeviceService, options?: DeviceClientOptions) {
    super(deviceService, options);
  }

  async getFreePort(excludes?: number[], offset?: number): Promise<number> {
    const response = await this.httpRequest(DeviceHost.getFreePort, new DeviceHost.getFreePort.pathProvider(), {
      excludes,
      offset,
    });
    const { port } = response;
    return port;
  }

  async getPathMap(): Promise<ThirdPartyPathMap> {
    const response = await this.httpRequest(DeviceHost.getPathMap, new DeviceHost.getPathMap.pathProvider());
    const { pathMap } = response;
    return pathMap;
  }

  async getTempPath(): Promise<string> {
    const response = await this.httpRequest(DeviceHost.getTempPath, new DeviceHost.getTempPath.pathProvider());
    return response.path;
  }

  async removeTemp(param: Instance<typeof DeviceHost.removeTemp.requestBody>): Promise<Instance<typeof DeviceHost.removeTemp.responseBodyData>> {
    const response = await this.httpRequest(DeviceHost.removeTemp, new DeviceHost.removeTemp.pathProvider(), undefined, param);
    return response;
  }

  async ensureBrowserAndDriver(
    options: Instance<typeof DeviceHost.ensureBrowserAndDriver.requestBody>,
  ): Promise<Instance<typeof DeviceHost.ensureBrowserAndDriver.responseBodyData>> {
    const result = await this.httpRequest(DeviceHost.ensureBrowserAndDriver, new DeviceHost.ensureBrowserAndDriver.pathProvider(), undefined, options);
    return result;
  }

  async resignApp(options: Instance<typeof DeviceHost.resignAppFile.requestBody>): Promise<Instance<typeof DeviceHost.resignAppFile.responseBodyData>> {
    const result = await this.httpRequest(DeviceHost.resignAppFile, new DeviceHost.resignAppFile.pathProvider(), undefined, options);
    return result;
  }

  async generateTemporaryToken(serial: Serial, body: Instance<typeof DeviceAuth.createToken.requestBody>): Promise<DeviceTemporaryToken> {
    const response = await this.httpRequest(DeviceAuth.createToken, new DeviceAuth.createToken.pathProvider(serial), undefined, body);
    return response.token;
  }

  async deleteTemporaryToken(body: Instance<typeof DeviceAuth.deleteToken.requestBody>): Promise<void> {
    await this.httpRequest(DeviceAuth.deleteToken, new DeviceAuth.deleteToken.pathProvider(), undefined, body);
  }

  private async connectWebSocket<SendMessageType, ReceiveMessageType, ReturnType>(
    webSocketSpec: WebSocketSpec<SendMessageType, ReceiveMessageType>,
    serial: Serial | undefined,
    onOpen: (deviceWebSocket: DeviceWebSocket) => ReturnType,
    onClose: (code: number, reason: string) => void,
    onMessage: (value: string | Uint8Array, deviceWebSocket: DeviceWebSocket) => void,
  ): Promise<ReturnType> {
    return new Promise((resolve, reject) => {
      let isOpened = false;
      const path = webSocketSpec.path;
      const deviceWebSocket = this.deviceService.connectWebSocket(
        {
          path,
        },
        serial,
        this.options,
        {
          onOpen() {
            isOpened = true;
            resolve(onOpen(deviceWebSocket));
          },
          onClose(ev) {
            const { code, reason } = ev;
            if (!isOpened) {
              reject(new Error(`Unexpected close: ${code} ${reason}`));
              return;
            }
            onClose(code, reason);
          },
          onMessage(ev) {
            const { value } = ev;
            if (!value) {
              throw new Error(`Unexpected data: ${stringify(ev)}`);
            }
            const { $case } = value;
            if ($case === 'bytesValue') {
              onMessage(value.bytesValue, deviceWebSocket);
            } else if ($case === 'stringValue') {
              onMessage(value.stringValue, deviceWebSocket);
            } else {
              throw new Error(`Unexpected data: ${stringify(value)}`);
            }
          },
        },
      );
    });
  }

  // async uploadFile(fileName: string, fileSize: number, onProgress: (offset: number) => void, onComplete: (filePath: string, error?: Error) => void): Promise<HostFileUploader> {
  //   return this.connectWebSocket(
  //     DeviceHostUploadFile,
  //     (deviceWebSocket) => {
  //       const sendMessage: Instance<typeof DeviceHostUploadFile.sendMessage> = {
  //         value: {
  //           $case: 'start',
  //           start: {
  //             fileName,
  //             fileSize,
  //           },
  //         },
  //       };
  //       deviceWebSocket.send(DeviceHostUploadFileSendMessage.encode(sendMessage).finish());
  //       return new HostFileUploader(deviceWebSocket);
  //     },
  //     (code, reason) => {
  //       if (code === 1000) {
  //         return;
  //       }
  //       onComplete('', new Error(`Unexpected close: ${code} ${reason}`));
  //     },
  //     (value, deviceWebSocket) => {
  //       if (!(value instanceof Uint8Array)) {
  //         throw new Error(`Unexpected data: ${stringify(value)}`);
  //       }

  //       const receiveMessage = DeviceHostUploadFileReceiveMessage.decode(value);
  //       if (!receiveMessage.value) {
  //         throw new Error(`Empty data: ${stringify(receiveMessage)}`);
  //       }
  //       const { $case } = receiveMessage.value;
  //       if ($case === 'inProgress') {
  //         const { offset } = receiveMessage.value.inProgress;
  //         onProgress(offset);
  //       } else if ($case === 'complete') {
  //         const { filePath } = receiveMessage.value.complete;

  //         onComplete(filePath);
  //         deviceWebSocket.close(1000, 'OK');
  //       }
  //     },
  //   );
  // }

  async downloadSharedResource(filePath: string, url: string, expectedFileSize: number, headers?: Record<string, string>): Promise<void> {
    const { printable } = this.options;
    return new Promise((resolve, reject) => {
      this.connectWebSocket(
        DeviceHostDownloadSharedResource,
        undefined,
        (deviceWebSocket) => {
          const sendMessage: Instance<typeof DeviceHostDownloadSharedResource.sendMessage> = {
            url,
            headers,
            filePath,
            expectedFileSize,
          };
          deviceWebSocket.send(JSON.stringify(sendMessage));
          return new DeviceCloser(deviceWebSocket);
        },
        (code, reason) => {
          if (code === 1000) {
            resolve();
          } else {
            reject(new Error(`Unexpected close: ${code} ${reason}`));
          }
        },
        (value, deviceWebSocket) => {
          const casted = typeof value === 'string' ? value : Buffer.from(value).toString();
          transformAndValidate(DeviceHostDownloadSharedResource.receiveMessage, JSON.parse(casted))
            .then((message) => {
              const { responseCode, responseHeaders } = message;
              printable.info('Download Complete', {
                filePath,
                responseCode,
                responseHeaders,
              });
            })
            .catch((error) => {
              printable.error('Failed to parse download shared resource message', { error: errorify(error) });
              closeWebSocketWithTruncateReason(deviceWebSocket, 1001, 'download shared resource failed');
            });
        },
      )
        .then((closer) => {
          // noop
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
