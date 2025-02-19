import axios from 'axios';
import { WebSocket } from 'ws';
import { DeviceClientOptions, DeviceService, DeviceWebSocket, DeviceWebSocketListener } from './bases.js';
import { setAxiosErrorFilterToIntercepter } from './common/axios-utils.js';
import { stringify } from './common/functions.js';
import { closeWebSocketWithTruncateReason } from './common/http-ws.js';
import { FilledPrintable, PrefixLogger, Printable } from './common/logs.js';
import { Headers, HeaderValue, HttpRequest, HttpResponse, WebSocketConnection } from './types/http-ws.js';
import { DOGU_DEVICE_AUTHORIZATION_HEADER_KEY, DOGU_DEVICE_SERIAL_HEADER_KEY, Serial } from './types/types.js';
import { DeviceServerResponseDto } from './validations/types/responses.js';

export class NodeDeviceWebSocket implements DeviceWebSocket {
  private readonly logger: FilledPrintable;

  constructor(
    private readonly webSocket: WebSocket,
    printable: Printable,
  ) {
    this.logger = new PrefixLogger(printable, '[NodeDeviceWebSocket]');
  }

  send(message: string | Uint8Array): void {
    this.webSocket.send(message, (error) => {
      if (error) {
        this.logger.error(`send error`, { message, error: stringify(error) });
      } else {
        this.logger.verbose(`send success`, { message });
      }
    });
  }

  async close(code?: number | undefined, reason?: string | undefined): Promise<void> {
    await new Promise<void>((resolve) => {
      this.webSocket.once('close', () => {
        this.logger.verbose(`close`, { code, reason });
        resolve();
      });
      closeWebSocketWithTruncateReason(this.webSocket, code, reason);
    });
  }
}

export class NodeDeviceService implements DeviceService {
  private readonly client = axios.create();

  constructor() {
    setAxiosErrorFilterToIntercepter(this.client);
  }

  async httpRequest(request: HttpRequest, options: Required<DeviceClientOptions>): Promise<HttpResponse> {
    const { port, timeout, printable } = options;
    const logger = new PrefixLogger(printable, '[NodeDeviceService.httpRequest]');
    const { method, path, query } = request;
    const headersParsed = Object.fromEntries(request.headers?.values.map((value) => [value.key, value.value]) || []);
    let bodyParsed: any | undefined = undefined;
    if (!request.body) {
      bodyParsed = undefined;
    } else {
      const { value } = request.body;
      if (!value) {
        bodyParsed = undefined;
      } else {
        const { $case } = value;
        let stringValueParsed = '';
        if ($case === 'bytesValue') {
          const { bytesValue } = value;
          stringValueParsed = bytesValue.toString();
        } else if ($case === 'stringValue') {
          const { stringValue } = value;
          stringValueParsed = stringValue;
        } else {
          throw new Error(`Unexpected body value: ${stringify(value)}`);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        bodyParsed = JSON.parse(stringValueParsed);
      }
    }
    const url = `http://127.0.0.1:${port}${path}`;
    const headers = headersParsed;
    const params = query;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = bodyParsed;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    logger.verbose(`httpRequest`, { method, url, headers, params, data, timeout });
    const response = await this.client.request<DeviceServerResponseDto>({
      method,
      url,
      headers,
      params,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data,
      timeout,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const headerValues: HeaderValue[] = [];
    Object.entries(response.headers).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((value) => {
          headerValues.push({ key, value: String(value) });
        });
      } else {
        headerValues.push({ key, value: String(value) });
      }
    });
    const responseHeadersParsed: Headers = {
      values: headerValues,
    };
    const returningResponse: HttpResponse = {
      statusCode: response.status,
      headers: responseHeadersParsed,
      body: {
        value: {
          $case: 'stringValue',
          stringValue: JSON.stringify(response.data),
        },
      },
      request,
    };
    logger.verbose(`httpRequest response`, { returningResponse });
    return returningResponse;
  }

  connectWebSocket(connection: WebSocketConnection, serial: Serial | undefined, options: Required<DeviceClientOptions>, listener?: DeviceWebSocketListener): DeviceWebSocket {
    const { port, printable } = options;
    const logger = new PrefixLogger(printable, '[NodeDeviceService.connectWebSocket]');
    const { path } = connection;
    const url = `ws://127.0.0.1:${port}${path}`;
    const headers: Record<string, string> = { [DOGU_DEVICE_AUTHORIZATION_HEADER_KEY]: options.token };
    if (serial) {
      headers[DOGU_DEVICE_SERIAL_HEADER_KEY] = serial;
    }
    const webSocket = new WebSocket(url, {
      headers,
    });
    webSocket.on('open', () => {
      logger.verbose('open', { url });
      listener?.onOpen?.({});
    });
    webSocket.on('error', (error) => {
      logger.verbose('error', { url, error: stringify(error) });
      listener?.onError?.({ reason: stringify(error) });
    });
    webSocket.on('close', (code, reason) => {
      const reasonString = reason.toString();
      logger.verbose('close', { url, code, reason: reasonString });
      listener?.onClose?.({ code, reason: reasonString });
    });
    webSocket.on('message', (data, isBinary) => {
      logger.verbose('message', { url, data: isBinary ? data : data.toString(), isBinary });
      if (isBinary) {
        let dataParsed: Uint8Array | null = null;
        if (data instanceof Buffer) {
          dataParsed = new Uint8Array(data);
        } else if (data instanceof ArrayBuffer) {
          dataParsed = new Uint8Array(data);
        } else {
          throw new Error(`Unexpected data type: ${stringify(data)}`);
        }
        listener?.onMessage?.({
          value: { $case: 'bytesValue', bytesValue: dataParsed },
        });
      } else {
        listener?.onMessage?.({
          value: { $case: 'stringValue', stringValue: data.toString() },
        });
      }
    });
    return new NodeDeviceWebSocket(webSocket, printable);
  }
}
