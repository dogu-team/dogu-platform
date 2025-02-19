import {
  Code,
  DefaultScreenCaptureOption,
  ErrorResult,
  ErrorResultError,
  Platform,
  PrivateProtocol,
  ScreenCaptureOption,
  ScreenRecordOption,
  Serial,
  StreamingAnswer,
} from '@dogu-private/types';
import { FilledPrintable, stringify, stringifyError } from '@dogu-tech/common';
import { StreamingOfferDto } from '@dogu-tech/device-client-common';
import { renameRetry } from '@dogu-tech/node';
import fs from 'fs';
import lodash from 'lodash';
import path from 'path';
import { Observable } from 'rxjs';
import { makeWebmSeekable } from '../../externals/cli/ffmpeg';
import { GoDeviceControllerProcess } from '../../externals/cli/go-device-controller';
import { GoDeviceControllerGrpcClient } from '../../externals/network/go-device-controller-client';
import { delay } from '../../util/delay';
import { getOriginFilePathFromTmp, makeTmpFilePath } from '../../util/files';

type DcGdcDeviceContext = PrivateProtocol.DcGdcDeviceContext;
type DcGdcStartStreamingParam = PrivateProtocol.DcGdcStartStreamingParam;
type DcGdcStartStreamingResult = PrivateProtocol.DcGdcStartStreamingResult;
type DcGdcGetSurfaceStatusResult = PrivateProtocol.DcGdcGetSurfaceStatusResult;

export class PionStreamingService {
  private constructor(
    private readonly platform: Platform,
    private readonly grpcClient: GoDeviceControllerGrpcClient,
    private readonly logger: FilledPrintable,
  ) {}

  private port: number | null = null;

  static async create(serial: Serial, platform: Platform, deviceServerPort: number, logger: FilledPrintable): Promise<PionStreamingService> {
    const gdc = await GoDeviceControllerProcess.create(serial, platform, deviceServerPort, logger);
    const gdcClient = await GoDeviceControllerGrpcClient.create(serial, platform, gdc, `127.0.0.1:${gdc.port}`, 60);
    const ret = new PionStreamingService(platform, gdcClient, logger);
    return ret;
  }

  async startStreamingWithTrickle(serial: string, offer: StreamingOfferDto): Promise<Observable<StreamingAnswer>> {
    this.logger.verbose(`${this.constructor.name}.startStreamingWithTrickle`, {
      serial,
      offer,
    });

    const { value } = offer;
    const { $case } = value;
    if ($case === 'startStreaming') {
      const { startStreaming } = value;
      const { peerDescription, option } = startStreaming;
      const screenOption = { ...option.screen } as { [key: string]: unknown };
      // Object.keys(screenOption).forEach((key) => (screenOption[key] === undefined ? delete screenOption[key] : {}));
      const mergedCaptureOption: ScreenCaptureOption = lodash.merge(DefaultScreenCaptureOption(), screenOption as unknown as ScreenCaptureOption);
      return new Observable((subscriber) => {
        const param: DcGdcStartStreamingParam = {
          offer: {
            serial,
            value: {
              $case: 'startStreaming',
              startStreaming: {
                peerDescription,
                option: { screen: mergedCaptureOption },
                turnServerUrl: startStreaming.turnServerUrl,
                turnServerUsername: startStreaming.turnServerUsername,
                turnServerPassword: startStreaming.turnServerPassword,
                platform: startStreaming.platform,
              },
            },
          },
        };
        const stream = this.grpcClient.startStreaming(param);

        let errorOccurred: Error | null = null;
        stream.on('error', (error) => {
          this.logger.error('PionStreamingService.startStreamingWithTrickle.onError', { error });
          errorOccurred = error;
        });
        stream.on('close', () => {
          this.logger.verbose('PionStreamingService.startStreamingWithTrickle.onClose');
          if (errorOccurred != null) {
            subscriber.error(errorOccurred);
          } else {
            subscriber.complete();
          }
        });

        stream.on('data', (result: DcGdcStartStreamingResult) => {
          this.logger.verbose('PionStreamingService.startStreaming.onData', { result });
          const { answer } = result;
          if (answer === undefined) {
            throw new Error('answer is undefined');
          }
          subscriber.next(answer);
        });
      });
    } else if ($case === 'iceCandidate') {
      throw new Error('PionStreamingService.startStreamingWithTrickle.iceCandidate is not supported');
    } else {
      throw new Error(`Unexpected $case: ${stringify(offer)}`);
    }
    await delay(0);
  }

  stopStreaming(serial: Serial): void {
    this.logger.warn('PionStreamingService.stopStreaming is not implemented yet');
  }

  async startRecord(serial: string, option: ScreenRecordOption): Promise<ErrorResult> {
    const tmpFilePath = makeTmpFilePath(option.filePath);

    const mergedCaptureOption: ScreenCaptureOption = lodash.merge(DefaultScreenCaptureOption(), option.screen);
    const result = await this.grpcClient
      .call('dcGdcStartScreenRecordParam', 'dcGdcStartScreenRecordResult', {
        serial: serial,
        option: {
          screen: mergedCaptureOption,
          filePath: tmpFilePath,
          etcParam: option.etcParam ?? '',
        },
      })
      .catch((e) => {
        throw new ErrorResultError(Code.CODE_NETWORK_CONNECTION_ABORTED, `PionStreamingService.stopStreaming error: ${stringifyError(e)}`);
      });
    if (!result.error) {
      throw new ErrorResultError(Code.CODE_STRING_EMPTY, 'startRecord response is null');
    }
    return result.error;
  }

  async stopRecord(serial: string, filePath: string): Promise<ErrorResult> {
    const tmpFilePath = makeTmpFilePath(filePath);
    const result = await this.grpcClient.call('dcGdcStopScreenRecordParam', 'dcGdcStopScreenRecordResult', { serial, filePath: tmpFilePath }).catch((e) => {
      throw new ErrorResultError(Code.CODE_NETWORK_CONNECTION_ABORTED, `PionStreamingService.stopStreaming error: ${stringifyError(e)}`);
    });
    if (!result.error) {
      throw new ErrorResultError(Code.CODE_STRING_EMPTY, 'startRecord response is null');
    }
    await postProcessRecord(result.filePath, this.logger);
    await renameRetry(result.filePath, getOriginFilePathFromTmp(result.filePath), this.logger);

    return result.error;
  }

  async deviceConnected(serial: Serial, context: DcGdcDeviceContext): Promise<void> {
    await this.grpcClient.deviceConnected(serial, context);
  }

  async getSurfaceStatus(serial: string): Promise<PrivateProtocol.DcGdcGetSurfaceStatusResult> {
    return await this.grpcClient.call('dcGdcGetSurfaceStatusParam', 'dcGdcGetSurfaceStatusResult', { serial: serial });
  }

  async refreshSession(serial: string): Promise<PrivateProtocol.DcGdcRefreshSessionResult> {
    return await this.grpcClient.call('dcGdcRefreshSessionParam', 'dcGdcRefreshSessionResult', { serial: serial, reconnectScreen: true, reconnectInput: true });
  }
}

async function postProcessRecord(filePath: string, logger: FilledPrintable): Promise<void> {
  const ext = path.extname(filePath);
  if (ext !== '.webm') {
    return;
  }

  const convertedFilePath = path.resolve(path.dirname(filePath), `seekable_${path.basename(filePath)}`);
  await makeWebmSeekable(filePath, convertedFilePath, logger);
  logger.info('startRecording postProcessRecord completed', { filePath, convertedFilePath });
  const fileTmpPath = `${filePath}.tmp`;
  await renameRetry(filePath, fileTmpPath, logger);
  await renameRetry(convertedFilePath, filePath, logger);
  await fs.promises.rm(fileTmpPath, { force: true });
}
