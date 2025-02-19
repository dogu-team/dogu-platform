import { FindHostByTokenResponse } from '@dogu-private/console-host-agent';
import { ThirdPartyPathMap } from '@dogu-private/types';
import { createEventDefinition, IsFilledString } from '@dogu-tech/common';
import { IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';
import { HostConnectionInfo, HostResolutionInfo } from '../types';

export class OnHostConnectingEventValue {
  @IsFilledString()
  token!: string;
}
export const OnHostConnectingEvent = createEventDefinition('OnHostConnecting', OnHostConnectingEventValue);

export class OnHostConnectedEventValue extends FindHostByTokenResponse implements HostConnectionInfo {}
export const OnHostConnectedEvent = createEventDefinition('OnHostConnected', OnHostConnectedEventValue);

export class OnHostResolvedEventValue extends OnHostConnectedEventValue implements HostResolutionInfo {
  @IsFilledString()
  hostWorkspacePath!: string;

  @IsFilledString()
  recordWorkspacePath!: string;

  @IsNotEmptyObject()
  pathMap!: ThirdPartyPathMap;
}
export const OnHostResolvedEvent = createEventDefinition('OnHostResolved', OnHostResolvedEventValue);

export type HostDisconnectedReason = 'invalid-token' | 'connection-failed';

export class OnHostDisconnectedEventValue {
  @IsNotEmptyObject()
  error: unknown;

  @IsString()
  @IsNotEmpty()
  reason!: HostDisconnectedReason;
}
export const OnHostDisconnectedEvent = createEventDefinition('OnHostDisconnected', OnHostDisconnectedEventValue);
