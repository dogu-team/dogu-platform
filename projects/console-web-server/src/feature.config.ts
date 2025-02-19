import { FeatureTableBase } from '@dogu-private/console';
import { FeatureConfig as FeatureConfigType, loadFeatureConfigSync } from '@dogu-tech/node';
import { env } from './env';
import { logger } from './module/logger/logger.instance';

export interface FeatureTable extends FeatureTableBase {}

export const FeatureConfig: FeatureConfigType<FeatureTable> = loadFeatureConfigSync<FeatureTable>(env.DOGU_RUN_TYPE, logger);
