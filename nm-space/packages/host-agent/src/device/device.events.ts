import { DeviceId, HostId, OrganizationId, Platform, Serial, ThirdPartyPathMap } from '@dogu-private/types';
import { createEventDefinition, IsFilledString } from '@dogu-tech/common';
import { BrowserInstallation } from '@dogu-tech/device-client';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString, IsUUID, Max, Min, ValidateNested } from 'class-validator';
import { DeviceConnectionInfo, DeviceResolutionInfo, DeviceWebSocketMap } from '../types';

export class OnDeviceConnectedEventValue implements DeviceConnectionInfo {
  @IsFilledString()
  serial!: Serial;

  @IsFilledString()
  serialUnique!: Serial;

  @IsEnum(Platform)
  platform!: Platform;

  @IsString()
  model!: string;

  @IsString()
  version!: string;

  @IsUUID()
  organizationId!: OrganizationId;

  @IsUUID()
  hostId!: HostId;

  @IsString()
  manufacturer!: string;

  @Min(0)
  @Max(1)
  @IsNumber()
  @IsNotEmpty()
  isVirtual!: number;

  @IsNumber()
  @Type(() => Number)
  resolutionWidth!: number;

  @IsNumber()
  @Type(() => Number)
  resolutionHeight!: number;

  @IsString()
  memory!: string;

  @ValidateNested({ each: true })
  @Type(() => BrowserInstallation)
  @IsArray()
  browserInstallations!: BrowserInstallation[];
}
export const OnDeviceConnectedEvent = createEventDefinition('OnDeviceConnected', OnDeviceConnectedEventValue);

export class OnDeviceDisconnectedEventValue {
  @IsString()
  @IsNotEmpty()
  serial!: Serial;
}
export const OnDeviceDisconnectedEvent = createEventDefinition('OnDeviceDisconnected', OnDeviceDisconnectedEventValue);

export class OnDeviceResolvedEventValue extends OnDeviceConnectedEventValue implements DeviceResolutionInfo {
  @IsUUID()
  deviceId!: DeviceId;

  @IsEnum(Platform)
  hostPlatform!: Platform;

  @IsFilledString()
  rootWorkspacePath!: string;

  @IsFilledString()
  recordWorkspacePath!: string;

  @IsFilledString()
  hostWorkspacePath!: string;

  @IsFilledString()
  deviceWorkspacePath!: string;

  @IsNotEmptyObject()
  pathMap!: ThirdPartyPathMap;
}
export const OnDeviceResolvedEvent = createEventDefinition('OnDeviceResolved', OnDeviceResolvedEventValue);

export class OnDeviceConnectionSubscriberDisconnectedEventValue {}
export const OnDeviceConnectionSubscriberDisconnectedEvent = createEventDefinition('OnDeviceConnectionSubscriberDisconnected', OnDeviceConnectionSubscriberDisconnectedEventValue);

export class OnDeviceRegisteredEventValue extends OnDeviceResolvedEventValue {
  @IsObject()
  webSocketMap!: DeviceWebSocketMap;
}

export const OnDeviceRegisteredEvent = createEventDefinition('OnDeviceRegistered', OnDeviceRegisteredEventValue);
