import {
  DeviceId,
  DEVICE_TABLE_NAME,
  extensionFromPlatform,
  platformTypeFromPlatform,
  RemoteDeviceJobId,
  RemotePayload,
  REMOTE_DEVICE_JOB_SESSION_STATE,
  REMOTE_TABLE_NAME,
} from '@dogu-private/types';
import { DefaultHttpOptions, delay, DoguRequestTimeoutHeader, HeaderRecord, Method, Query } from '@dogu-tech/common';
import {
  DeviceWebDriver,
  DoguWebDriverOptions,
  RelayRequest,
  RelayResponse,
  WebDriverDeleteSessionEndpointInfo,
  WebDriverNewSessionEndpointInfo,
  WebDriverSessionEndpointInfo,
} from '@dogu-tech/device-client-common';
import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import _ from 'lodash';
import { DataSource } from 'typeorm';
import { v4 } from 'uuid';
import { RemoteDeviceJob } from '../../../db/entity/remote-device-job.entity';
import { RemoteWebDriverInfo } from '../../../db/entity/remote-webdriver-info.entity';
import { SlackMessageService } from '../../../enterprise/module/integration/slack/slack-message.service';
import { BatchHttpRequest, BatchHttpRequestItem, DeviceMessageRelayer } from '../../device-message/device-message.relayer';
import { DoguLogger } from '../../logger/logger';
import { DeviceStatusService } from '../../organization/device/device-status.service';
import { ApplicationService } from '../../project/application/application.service';
import { FindProjectApplicationDto } from '../../project/application/dto/application.dto';
import { RemoteException } from '../common/exception';
import { WebDriverEndpointHandlerResult } from '../common/type';
import { RemoteDeviceJobProcessor } from '../processor/remote-device-job-processor';
import { RemoteWebDriverBatchRequestOptions, RemoteWebDriverBatchResponse } from './remote-webdriver.batch-request-executor';

export type RemoteWebDriverRequestCommonOptions = Pick<WebDriverEndpointHandlerResult, 'organizationId' | 'projectId' | 'deviceId' | 'deviceSerial'> & {
  headers: HeaderRecord;
};

export type RemoteWebDriverRequestOptions = RemoteWebDriverRequestCommonOptions & {
  request: RelayRequest;
};

@Injectable()
export class RemoteWebDriverService {
  constructor(
    @Inject(forwardRef(() => DeviceStatusService))
    private readonly deviceStatusService: DeviceStatusService,
    @InjectDataSource()
    private readonly dataSource: DataSource, //
    @Inject(DeviceMessageRelayer)
    private readonly deviceMessageRelayer: DeviceMessageRelayer,
    @Inject(ApplicationService)
    private readonly applicationService: ApplicationService,
    @Inject(SlackMessageService)
    private readonly slackMessageService: SlackMessageService,

    private readonly logger: DoguLogger,
  ) {}

  async sendRequest(options: RemoteWebDriverRequestOptions): Promise<RelayResponse> {
    const { deviceSerial, organizationId, deviceId, request, headers } = options;
    try {
      const pathProvider = new DeviceWebDriver.relayHttp.pathProvider(deviceSerial);
      const path = DeviceWebDriver.relayHttp.resolvePath(pathProvider);
      const response = await this.deviceMessageRelayer.sendHttpRequest(
        organizationId,
        deviceId,
        DeviceWebDriver.relayHttp.method,
        path,
        headers,
        undefined,
        request,
        DeviceWebDriver.relayHttp.responseBodyData,
      );
      return response;
    } catch (error) {
      throw new RemoteException(HttpStatus.INTERNAL_SERVER_ERROR, error, {});
    }
  }

  async sendBatchRequest(options: RemoteWebDriverBatchRequestOptions): Promise<RemoteWebDriverBatchResponse> {
    const { deviceSerial, organizationId, deviceId, requests, headers } = options;
    try {
      const pathProvider = new DeviceWebDriver.relayHttp.pathProvider(deviceSerial);
      const path = DeviceWebDriver.relayHttp.resolvePath(pathProvider);
      const requestItems = requests.map((request) => {
        const batchHttpRequestItem: BatchHttpRequestItem = {
          method: DeviceWebDriver.relayHttp.method,
          path,
          headers,
          body: request,
          responseBodyConstructor: DeviceWebDriver.relayHttp.responseBodyData,
        };
        return batchHttpRequestItem;
      });
      const batchHttpRequest: BatchHttpRequest = {
        parallel: options.parallel,
        items: requestItems,
      };
      const batchHttpResponse = await this.deviceMessageRelayer.sendBatchHttpRequest(organizationId, deviceId, batchHttpRequest);
      const transformeds = batchHttpResponse.items as RemoteWebDriverBatchResponse;
      return transformeds;
    } catch (error) {
      throw new RemoteException(HttpStatus.INTERNAL_SERVER_ERROR, error, {});
    }
  }

  async handleNewSessionRequest(
    endpointInfo: WebDriverNewSessionEndpointInfo,
    request: RelayRequest,
    doguOptions: DoguWebDriverOptions,
    remotePayload: RemotePayload,
  ): Promise<WebDriverEndpointHandlerResult> {
    const options = doguOptions;

    // find device
    const runsOn = options.runsOn;
    const deviceTagOrNames = Array.isArray(runsOn) ? runsOn : typeof runsOn === 'string' ? [runsOn] : [];
    if (deviceTagOrNames.length === 0) {
      throw new RemoteException(HttpStatus.BAD_REQUEST, new Error('Device tag or name not specified'), {});
    }

    const deviceIds: DeviceId[] = [];
    for (const tagOrName of deviceTagOrNames) {
      const deviceByName = await this.deviceStatusService.findDevicesByName(this.dataSource.manager, options.organizationId, options.projectId, [tagOrName]);
      if (deviceByName[0] && deviceByName.length === 1 && deviceByName[0].name === tagOrName) {
        deviceIds.push(deviceByName[0].deviceId);
      } else {
        const devicesByTag = await this.deviceStatusService.findDevicesByDeviceTag(this.dataSource.manager, options.organizationId, options.projectId, [tagOrName]);
        if (devicesByTag.length === 0) {
          throw new RemoteException(
            HttpStatus.NOT_FOUND,
            new Error(`Device not found. runs-on: ${deviceTagOrNames.join(', ')}, organizationId: ${options.organizationId}, projectId: ${options.projectId}`),
            {},
          );
        }
        const deviceIdsByTag = devicesByTag.map((device) => device.deviceId);
        deviceIds.push(...deviceIdsByTag);
      }
    }
    if (deviceIds.length === 0) {
      throw new RemoteException(HttpStatus.NOT_FOUND, new Error(`Device not found. runs-on: ${deviceTagOrNames.join(', ')}`), {});
    }

    const uniqueDeviceIds = [...new Set(deviceIds)];
    const sortDevicesByRunningRate = await this.deviceStatusService.sortDevicesByRunningRate(uniqueDeviceIds);
    if (sortDevicesByRunningRate.length === 0) {
      throw new RemoteException(HttpStatus.NOT_FOUND, new Error(`Device not found. Device runs-on: ${deviceTagOrNames.join(', ')}`), {});
    }
    const device = sortDevicesByRunningRate[0];

    const devicePlatformType = platformTypeFromPlatform(device.platform);
    const headers = this.convertHeaders(request.headers);

    let applicationUrl: string | undefined = undefined;
    let applicationVersion: string | undefined = undefined;
    let applicationFileSize: number | undefined = undefined;
    if (devicePlatformType === 'android' || devicePlatformType === 'ios') {
      if (options.appVersion) {
        const findAppDto = new FindProjectApplicationDto();
        findAppDto.version = options.appVersion;
        findAppDto.extension = extensionFromPlatform(devicePlatformType);
        const applications = await this.applicationService.getApplicationList(options.organizationId, options.projectId, findAppDto);
        if (applications.items.length === 0) {
          throw new RemoteException(HttpStatus.BAD_REQUEST, new Error('Application not found'), {});
        }
        const application = applications.items[0];
        applicationUrl = await this.applicationService.getApplicationDownladUrl(application.projectApplicationId, options.organizationId, options.projectId);
        applicationVersion = application.version;
        applicationFileSize = application.fileSize;
      }
    }

    const remoteDeviceJobId = v4();
    const rv = await this.dataSource.manager.transaction(async (manager) => {
      const remoteDeviceJob = await RemoteDeviceJobProcessor.createWebdriverRemoteDeviceJob(
        manager,
        options.projectId,
        device.deviceId,
        remoteDeviceJobId,
        options.browserName ?? null,
        options.browserVersion ?? null,
        doguOptions,
        remotePayload.userId ?? null,
        remotePayload.creatorType,
      );
      return remoteDeviceJob;
    });

    return {
      organizationId: options.organizationId,
      remoteDeviceJobId: remoteDeviceJobId,
      projectId: options.projectId,
      deviceId: device.deviceId,
      devicePlatform: devicePlatformType,
      deviceSerial: device.serial,
      browserName: options.browserName,
      browserVersion: options.browserVersion,
      applicationUrl,
      applicationVersion,
      applicationFileSize,
      request: {
        path: request.path,
        headers: headers,
        method: request.method as Method,
        query: request.query,
        reqBody: endpointInfo.capabilities,
      },
    };
  }

  async handleNewSessionResponse(handleResult: WebDriverEndpointHandlerResult, response: RelayResponse): Promise<void> {
    if (response.status !== 200) {
      return;
    }

    const sessionId = _.get(response.resBody, 'value.sessionId') as string | undefined;
    if (!sessionId) {
      throw new RemoteException(HttpStatus.BAD_REQUEST, new Error('Session id not found in response'), {});
    }

    const webDriverSeCdp = _.get(response.resBody, 'value.capabilities.se:cdp', null) as string | null;
    const remoteDeviceJob = await this.dataSource.getRepository(RemoteDeviceJob).findOne({ where: { remoteDeviceJobId: handleResult.remoteDeviceJobId } });
    if (!remoteDeviceJob) {
      throw new RemoteException(HttpStatus.NOT_FOUND, new Error(`handleNewSessionResponse. remote-device-job not found. remoteDeviceJobId: ${handleResult.remoteDeviceJobId}`), {});
    }

    await RemoteDeviceJobProcessor.updateRemoteDeviceJobByCapabilities(this.dataSource.manager, handleResult.remoteDeviceJobId, sessionId, webDriverSeCdp);
  }

  async waitRemoteDeviceJobToInprogress(remoteDeviceJobId: RemoteDeviceJobId): Promise<void> {
    while (true) {
      const remoteDeviceJob = await this.dataSource.getRepository(RemoteDeviceJob).findOne({ where: { remoteDeviceJobId } });
      if (!remoteDeviceJob) {
        throw new RemoteException(HttpStatus.NOT_FOUND, new Error(`Remote device job not found. remoteDeviceJobId: ${remoteDeviceJobId}`), {});
      }

      if (remoteDeviceJob.sessionState === REMOTE_DEVICE_JOB_SESSION_STATE.IN_PROGRESS) {
        return;
      }

      if (remoteDeviceJob.sessionState === REMOTE_DEVICE_JOB_SESSION_STATE.FAILURE) {
        throw new RemoteException(HttpStatus.INTERNAL_SERVER_ERROR, new Error(`Remote device job failed. remoteDeviceJobId: ${remoteDeviceJobId}`), {});
      }

      this.logger.info(
        `waitRemoteDeviceJobToInprogress. waiting remoteDeviceJob to be in_progress state. remoteDeviceJobId: ${remoteDeviceJobId}. state: ${remoteDeviceJob.sessionState}`,
      );
      await delay(3 * 1000);
    }
  }

  // complete remoteDeviceJob
  async handleDeleteSessionRequest(endpointInfo: WebDriverDeleteSessionEndpointInfo, request: RelayRequest): Promise<WebDriverEndpointHandlerResult> {
    const sessionId = endpointInfo.sessionId;
    if (!sessionId) {
      throw new RemoteException(HttpStatus.BAD_REQUEST, new Error('empty session path'), {});
    }

    const remoteDeviceJob = await this.dataSource.getRepository(RemoteDeviceJob).findOne({ where: { sessionId }, relations: [DEVICE_TABLE_NAME, REMOTE_TABLE_NAME] });
    if (!remoteDeviceJob) {
      throw new RemoteException(HttpStatus.NOT_FOUND, new Error(`Remote device job not found. sessionId: ${sessionId}`), {});
    }
    const remote = remoteDeviceJob.remote!;
    const remoteWdaInfo = await this.dataSource.getRepository(RemoteWebDriverInfo).findOne({ where: { remoteId: remote.remoteId } });

    const device = remoteDeviceJob.device!;

    await RemoteDeviceJobProcessor.setRemoteDeviceJobSessionState(this.dataSource.manager, remoteDeviceJob, REMOTE_DEVICE_JOB_SESSION_STATE.COMPLETE, this.slackMessageService);

    const headers = this.convertHeaders(request.headers);
    const devicePlatform = platformTypeFromPlatform(device.platform);
    return {
      organizationId: device.organizationId,
      projectId: remoteDeviceJob.remote!.projectId,
      remoteDeviceJobId: remoteDeviceJob.remoteDeviceJobId,
      deviceId: device.deviceId,
      devicePlatform,
      deviceSerial: device.serial,
      browserName: remoteWdaInfo!.browserName ?? undefined,
      browserVersion: remoteWdaInfo!.browserVersion ?? undefined,
      sessionId,
      request: {
        path: request.path,
        headers,
        method: request.method as Method,
        query: request.query,
        reqBody: request.reqBody,
      },
    };
  }

  async handleDeleteSessionResponse(handleResult: WebDriverEndpointHandlerResult, response: RelayResponse): Promise<void> {
    if (response.status !== 200) {
      return;
    }
    const sessionId = handleResult.sessionId;
    if (!sessionId) {
      throw new RemoteException(HttpStatus.BAD_REQUEST, new Error('Session id not found when deleting'), {});
    }
    const pathProvider = new DeviceWebDriver.sessionDeleted.pathProvider(handleResult.deviceSerial);
    const path = DeviceWebDriver.sessionDeleted.resolvePath(pathProvider);
    const headers: HeaderRecord = {};
    headers[DoguRequestTimeoutHeader] = DefaultHttpOptions.request.timeout1minutes.toString();
    const res = await this.deviceMessageRelayer.sendHttpRequest(
      handleResult.organizationId,
      handleResult.deviceId,
      DeviceWebDriver.sessionDeleted.method,
      path,
      headers,
      undefined,
      { sessionId: sessionId },
      DeviceWebDriver.sessionDeleted.responseBody,
    );
  }

  // Inprogress remoteDeviceJob
  async handleEachSessionRequest(endpointInfo: WebDriverSessionEndpointInfo, request: RelayRequest): Promise<WebDriverEndpointHandlerResult> {
    const sessionId = endpointInfo.sessionId;
    if (!sessionId) {
      throw new RemoteException(HttpStatus.BAD_REQUEST, new Error('empty session path'), {});
    }

    const remoteDeviceJob = await this.dataSource.getRepository(RemoteDeviceJob).findOne({ where: { sessionId }, relations: [DEVICE_TABLE_NAME, REMOTE_TABLE_NAME] });
    if (!remoteDeviceJob) {
      throw new RemoteException(HttpStatus.NOT_FOUND, new Error(`Remote device job not found. sessionId: ${sessionId}`), {});
    }
    const remote = remoteDeviceJob.remote!;
    const remoteWdaInfo = await this.dataSource.getRepository(RemoteWebDriverInfo).findOne({ where: { remoteId: remote.remoteId } });
    if (!remoteWdaInfo) {
      throw new RemoteException(HttpStatus.NOT_FOUND, new Error(`Remote web driver info not found. remoteId: ${remote.remoteId}`), {});
    }
    const device = remoteDeviceJob.device!;

    this.logger.info(`handleEachSessionRequest. remoteDeviceJobId: ${remoteDeviceJob.remoteDeviceJobId}. sessionId: ${sessionId}`);
    await RemoteDeviceJobProcessor.setRemoteDeviceJobLastIntervalTime(this.dataSource.manager, remoteDeviceJob);

    const headers = this.convertHeaders(request.headers);
    const devicePlatform = platformTypeFromPlatform(device.platform);
    return {
      organizationId: device.organizationId,
      projectId: remote!.projectId,
      remoteDeviceJobId: remoteDeviceJob.remoteDeviceJobId,
      deviceId: device.deviceId,
      devicePlatform,
      deviceSerial: device.serial,
      browserName: remoteWdaInfo!.browserName ?? undefined,
      browserVersion: remoteWdaInfo!.browserVersion ?? undefined,
      request: {
        path: request.path,
        headers: headers,
        method: request.method as Method,
        query: request.query,
        reqBody: request.reqBody,
      },
    };
  }

  convertHeaders(requestHeaders: IncomingHttpHeaders): HeaderRecord {
    const headers: HeaderRecord = {};
    for (const key of Object.keys(requestHeaders)) {
      const value = requestHeaders[key]!;
      if (value instanceof Array) {
        throw new Error('Multiple headers not supported');
      }
      headers[key] = value;
    }
    return headers;
  }

  private convertQuery(query: Query): Query | undefined {
    return _.isEmpty(query) ? undefined : query;
  }

  convertRequest(request: Request): RelayRequest {
    const headers = this.convertHeaders(request.headers);
    const query = this.convertQuery(request.query);
    const subpath = request.url.replace('/remote/wd/hub', '');
    return {
      path: subpath,
      headers: headers,
      method: request.method as Method,
      query,
      reqBody: request.body,
    };
  }
}
