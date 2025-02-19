import { DeviceId } from '@dogu-tech/types';
import { RoutineJobId } from '../routine-job';
import { PIPELINE_STATUS } from '../routine-pipeline';

export type RoutineDeviceJobId = number;
export const ROUTINE_DEVICE_JOB_TABLE_NAME = 'routine_device_job';

export const ROUTINE_DEVICE_JOB_APP_VERSION_MAX_LENGTH = 128;
export const ROUTINE_DEVICE_JOB_APP_PACKAGE_NAME_MAX_LENGTH = 256;
export const ROUTINE_DEVICE_JOB_BROWSER_NAME_MAX_LENGTH = 128;
export const ROUTINE_DEVICE_JOB_BROWSER_VERSION_MAX_LENGTH = 128;

export interface RoutineDeviceJob {
  routineDeviceJobId: RoutineDeviceJobId;
  routineJobId: RoutineJobId;
  deviceId: DeviceId;
  status: PIPELINE_STATUS;
  record: number;
  appVersion: string | null;
  appPackageName: string | null;
  browserName: string | null;
  browserVersion: string | null;
  deviceRunnerId: string | null;
  windowProcessId: number | null;
  heartbeat: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  inProgressAt: Date | null;
  completedAt: Date | null;
  localInProgressAt: Date | null;
  localCompletedAt: Date | null;
}
