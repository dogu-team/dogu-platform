import { EnvLoader } from '@dogu-tech/env-tools';
import { IsNotEmpty, IsString } from 'class-validator';

export class Env {
  @IsString()
  @IsNotEmpty()
  DOGU_GITHUB_TOKEN!: string;
}

export const env = new EnvLoader(Env).loadSync();
