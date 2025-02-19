import { Module } from '@nestjs/common';
import { InfluxDbDeviceService } from './influxdb-device.service';
import { InfluxDbLogService } from './influxdb-log.service';
import { InfluxDbApi } from './influxdb.api';
import { InfluxDbQuerier } from './influxdb.querier';
import { InfluxDbWriter } from './influxdb.writer';

@Module({
  providers: [InfluxDbApi, InfluxDbQuerier, InfluxDbWriter, InfluxDbDeviceService, InfluxDbLogService],
  exports: [InfluxDbDeviceService, InfluxDbLogService],
})
export class InfluxDbModule {}
