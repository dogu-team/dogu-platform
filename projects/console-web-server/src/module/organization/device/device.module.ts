import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Device, DeviceAndDeviceTag, DeviceTag, Project } from '../../../db/entity/index';
import { LicenseModule } from '../../../enterprise/module/license/license.module';
import { DeviceMessageModule } from '../../device-message/device-message.module';
import { InfluxDbModule } from '../../influxdb/influxdb.module';
import { DeviceTagModule } from '../device-tag/device-tag.module';
import { DeviceCommandService } from './device-command.service';
import { DeviceStatusService } from './device-status.service';
import { DeviceController } from './device.controller';

@Module({
  imports: [
    // LicenseModule,
    TypeOrmModule.forFeature([Device, DeviceAndDeviceTag, DeviceTag, Project]), //
    InfluxDbModule,
    DeviceMessageModule,
    forwardRef(() => DeviceTagModule),
    LicenseModule,
  ],
  controllers: [DeviceController],
  providers: [DeviceStatusService, DeviceCommandService],
  exports: [DeviceStatusService, DeviceCommandService],
})
export class DeviceModule {}
