import 'reflect-metadata';

import { DoguRunType, NodeEnvType } from '@dogu-private/types';
import { IsFilledString } from '@dogu-tech/common';
import { Type } from 'class-transformer';
import { IsIn, IsNumber } from 'class-validator';

export class E2eEnv {
  @IsIn(NodeEnvType)
  NODE_ENV!: NodeEnvType;

  @IsIn(DoguRunType)
  DOGU_RUN_TYPE!: DoguRunType;

  @IsFilledString()
  DOGU_E2E_HOST!: string;

  @IsNumber()
  @Type(() => Number)
  DOGU_CONSOLE_WEB_FRONT_PORT!: number;

  @IsNumber()
  @Type(() => Number)
  DOGU_CONSOLE_WEB_SERVER_PORT!: number;

  @IsNumber()
  @Type(() => Number)
  DOGU_E2E_DEVICE_SERVER_PORT!: number;
}
