import { DEVICE_JOB_LOG_TYPE, OrganizationId, RoutineDeviceJobId, RoutineStepId, Serial } from '@dogu-private/types';
import { closeWebSocketWithTruncateReason, Instance, stringify, transformAndValidate, validateAndEmitEventAsync } from '@dogu-tech/common';
import { DeviceLogSubscribe } from '@dogu-tech/device-client';
import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import WebSocket from 'ws';
import { DeviceAuthService } from '../device-auth/device-auth.service';
import { OnDeviceJobCancelRequestedEvent, OnDeviceJobLoggedEvent, OnDeviceJobPostProcessCompletedEvent, OnDeviceJobStartedEvent } from '../device-job/device-job.events';
import { env } from '../env';
import { OnHostDisconnectedEvent } from '../host/host.events';
import { DoguLogger } from '../logger/logger';
import { OnStepStartedEvent } from '../step/step.events';

interface DeviceLogInfo {
  webSocket: WebSocket;
  executorOrganizationId: OrganizationId;
  routineDeviceJobId: RoutineDeviceJobId;
  routineStepId?: RoutineStepId;
  serial: Serial;
}

@Injectable()
export class DeviceJobLogProcessRegistry {
  private readonly webSockets = new Map<string, DeviceLogInfo>();

  constructor(
    private readonly logger: DoguLogger,
    private readonly eventEmitter: EventEmitter2,
    private readonly authService: DeviceAuthService,
  ) {}

  @OnEvent(OnHostDisconnectedEvent.key)
  onHostDisconnected(value: Instance<typeof OnHostDisconnectedEvent.value>): void {
    this.webSockets.forEach((info, serial) => {
      const { webSocket } = info;
      closeWebSocketWithTruncateReason(webSocket, 1001, 'Host disconnected');
    });
    this.webSockets.clear();
  }

  @OnEvent(OnDeviceJobStartedEvent.key)
  onDeviceJobStarted(value: Instance<typeof OnDeviceJobStartedEvent.value>): void {
    const { executorOrganizationId, routineDeviceJobId, serial } = value;
    const key = this.createKey(executorOrganizationId, routineDeviceJobId);
    const webSocket = new WebSocket(`ws://${env.DOGU_DEVICE_SERVER_HOST_PORT}${DeviceLogSubscribe.path}`, { headers: this.authService.makeAuthHeader() });
    if (this.webSockets.has(key)) {
      throw new Error(`device log already exists: ${key}`);
    }
    this.webSockets.set(key, { webSocket, serial, executorOrganizationId, routineDeviceJobId });

    webSocket.addEventListener('open', () => {
      this.logger.info('startDeviceLogSubscribe open');
      const sendMessage: Instance<typeof DeviceLogSubscribe.sendMessage> = {
        serial,
        args: [],
      };
      webSocket.send(JSON.stringify(sendMessage), (error) => {
        if (error) {
          this.logger.error('startDeviceLogSubscribe failed to send message', { error });
          closeWebSocketWithTruncateReason(webSocket, 1001, 'Failed to device log subscribe');
        } else {
          this.logger.info('startDeviceLogSubscribe sent message');
        }
      });
    });
    webSocket.addEventListener('error', (ev) => {
      this.logger.error('startDeviceLogSubscribe error', { error: stringify(ev.error) });
    });
    webSocket.addEventListener('close', (ev) => {
      const deviceLogInfo = this.webSockets.get(key);
      if (!deviceLogInfo) {
        this.logger.warn('startDeviceLogSubscribe close: deviceLogInfo not found', { executorOrganizationId, routineDeviceJobId });
        return;
      }
      this.webSockets.delete(key);
      this.logger.info('startDeviceLogSubscribe close', { code: ev.code, reason: ev.reason });
    });
    webSocket.addEventListener('message', (ev) => {
      const { data } = ev;
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      transformAndValidate(DeviceLogSubscribe.receiveMessage, JSON.parse(data.toString()))
        .then(async (message) => {
          const storeValue = this.webSockets.get(key);
          if (!storeValue) {
            this.logger.error('startDeviceLogSubscribe failed to get storeValue', { key });
            return;
          }
          await validateAndEmitEventAsync(this.eventEmitter, OnDeviceJobLoggedEvent, {
            executorOrganizationId,
            routineDeviceJobId,
            log: {
              ...message,
              type: DEVICE_JOB_LOG_TYPE.DEVICE,
              routineStepId: storeValue.routineStepId,
            },
          });
        })
        .catch((error) => {
          this.logger.error('startDeviceLogSubscribe failed to parse message', { error: stringify(error) });
        });
    });
  }

  @OnEvent(OnStepStartedEvent.key)
  onStepStartedEvent(value: Instance<typeof OnStepStartedEvent.value>): void {
    const { executorOrganizationId, routineDeviceJobId, routineStepId } = value;
    const key = this.createKey(executorOrganizationId, routineDeviceJobId);
    const storeValue = this.webSockets.get(key);
    if (!storeValue) {
      this.logger.warn(`DeviceJobLogProcessRegistry.onStepStartedEvent deviceJob not exists: ${key}`);
      return;
    }
    this.webSockets.set(key, { ...storeValue, routineStepId });
  }

  @OnEvent(OnDeviceJobCancelRequestedEvent.key)
  onDeviceJobCancelRequested(value: Instance<typeof OnDeviceJobCancelRequestedEvent.value>): void {
    const { executorOrganizationId, routineDeviceJobId } = value;
    const key = this.createKey(executorOrganizationId, routineDeviceJobId);
    const deviceLogInfo = this.webSockets.get(key);
    if (!deviceLogInfo) {
      this.logger.warn('onDeviceJobCancelRequested: deviceLogInfo not found', { executorOrganizationId, routineDeviceJobId });
      return;
    }
    const { webSocket } = deviceLogInfo;
    if (webSocket.readyState === WebSocket.CLOSING || webSocket.readyState === WebSocket.CLOSED) {
      this.logger.warn('onDeviceJobCancelRequested: webSocket is already closing or closed', { executorOrganizationId, routineDeviceJobId });
      return;
    }
    closeWebSocketWithTruncateReason(webSocket, 1001, 'Cancel requested');
  }

  @OnEvent(OnDeviceJobPostProcessCompletedEvent.key)
  onDeviceJobPostProcessCompleted(value: Instance<typeof OnDeviceJobPostProcessCompletedEvent.value>): void {
    const { executorOrganizationId, routineDeviceJobId } = value;
    const key = this.createKey(executorOrganizationId, routineDeviceJobId);
    const deviceLogInfo = this.webSockets.get(key);
    if (!deviceLogInfo) {
      this.logger.warn('onDeviceJobCompleted: deviceLogInfo not found', { executorOrganizationId, routineDeviceJobId });
      return;
    }
    const { webSocket } = deviceLogInfo;
    closeWebSocketWithTruncateReason(webSocket, 1001, 'Completed');
  }

  private createKey(executorOrganizationId: OrganizationId, routineDeviceJobId: RoutineDeviceJobId): string {
    return `${executorOrganizationId}:${routineDeviceJobId}`;
  }
}
