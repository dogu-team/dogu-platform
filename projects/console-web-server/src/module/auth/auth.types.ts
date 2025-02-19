// user jwt key
export const USER_JWT_GUARD_KEY = 'USER_JWT_GUARD';

// organization role type
export const ORGANIZATION_ROLE_KEY = 'ORGANIZATION_ROLE';
export enum ORGANIZATION_ROLE {
  OWNER = 1,
  ADMIN = 2,
  MEMBER = 3,
}

// project role type
export const PROJECT_ROLE_KEY = 'PROJECT_ROLE';
export enum PROJECT_ROLE {
  ADMIN = 1,
  WRITE = 2,
  READ = 3,
}

// email verification type
export const EMAIL_VERIFICATION_KEY = 'EMAIL_VERIFICATION';
export enum EMAIL_VERIFICATION {
  VERIFIED = 'Verified',
  UNVERIFIED = 'Unverified',
}

// host role type
export const HOST_ACTION_KEY = 'HOST_ROLE';
export enum HOST_ACTION_TYPE {
  CREATE_HOST_API = 'CREATE_HOST_API',
  CREATE_DEVICE_API = 'CREATE_DEVICE_API',
  HOST_API = 'HOST_API',
  DEVICE_API = 'DEVICE_API',
  PROJECT_ACTION_API = 'PROJECT_ACTION_API',
}

export const REMOTE_API_KEY = 'REMOTE_API_GUARD_KEY';
export enum REMOTE_API_TYPE {
  WEBDRIVER_AGENT = 'WEBDRIVER_AGENT',
}

export const REMOTE_ORGANIZATION_ROLE_KEY = 'REMOTE_ORGANIZATION_ROLE';
export const REMOTE_PROJECT_ROLE_KEY = 'REMOTE_PROJECT_ROLE';

export const LICENSE_AUTHROIZE_KEY = 'LICENSE_AUTHROIZE';
export enum LICENSE_AUTHROIZE {
  OPEN_API = 'OPEN_API',
  DOGU_AGENT_AUTO_UPDATE = 'DOGU_AGENT_AUTO_UPDATE',
}

export const SELF_HOSTED_ROLE_KEY = 'SELF_HOSTED_ROLE';
export enum SELF_HOSTED_ROLE {
  ROOT = 'ROOT',
  MEMBER = 'MEMBER',
}
