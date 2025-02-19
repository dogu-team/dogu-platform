import { PrivateDevice } from '@dogu-private/console-host-agent';
import { createConsoleApiAuthHeader } from '@dogu-private/types';
import { DefaultHttpOptions, errorify, Instance, Retry, transformAndValidate } from '@dogu-tech/common';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ConsoleClientService } from '../console-client/console-client.service';
import { env } from '../env';
import { DoguLogger } from '../logger/logger';
import { logger } from '../logger/logger.instance';
import { OnDeviceRegisteredEvent } from './device.events';

@Injectable()
export class DeviceUpdater {
  constructor(
    private readonly consoleClientService: ConsoleClientService,
    private readonly logger: DoguLogger,
  ) {}

  @OnEvent(OnDeviceRegisteredEvent.key)
  async onDeviceRegisteredEvent(value: Instance<typeof OnDeviceRegisteredEvent.value>): Promise<void> {
    await this.updateDevice(value);
  }

  @Retry({ printable: logger })
  private async updateDevice(value: Instance<typeof OnDeviceRegisteredEvent.value>): Promise<void> {
    const {
      organizationId, //
      deviceId,
      serial,
      serialUnique,
      hostId,
      version,
      model,
      manufacturer,
      resolutionWidth,
      resolutionHeight,
      platform,
      isVirtual,
      memory,
      browserInstallations,
    } = value;
    const pathProvider = new PrivateDevice.updateDevice.pathProvider(organizationId, deviceId);
    const path = PrivateDevice.updateDevice.resolvePath(pathProvider);
    const body: Instance<typeof PrivateDevice.updateDevice.requestBody> = {
      serial,
      serialUnique,
      hostId,
      version,
      model,
      manufacturer,
      resolutionWidth,
      resolutionHeight,
      platform,
      isVirtual,
      memory,
      browserInstallations,
    };
    this.logger.info('DeviceUpdater.updateDevice request start', { value });
    const bodyValidated = await transformAndValidate(PrivateDevice.updateDevice.requestBody, body);
    await this.consoleClientService.client
      .patch(path, bodyValidated, {
        ...createConsoleApiAuthHeader(env.DOGU_HOST_TOKEN),
        timeout: DefaultHttpOptions.request.timeout,
      })
      .catch((error) => {
        this.logger.error('Failed to update device', {
          organizationId,
          deviceId,
          body,
          error: errorify(error),
        });
        throw error;
      });
  }
}
