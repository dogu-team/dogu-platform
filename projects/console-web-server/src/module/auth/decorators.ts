import {
  GOOGLE,
  GoogleOAuthPayload,
  HostPayload,
  RemotePayload,
  UserPayload,
  V1OpenApiPayload,
  V1_OPEN_API_ORGANIZATION_ROLE_KEY,
  V1_OPEN_API_PROJECT_ROLE_KEY,
} from '@dogu-private/types';
import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LicenseGuard } from '../../enterprise/module/auth/guard/license.guard';
import { V1OpenApiOrganizationGuard } from '../../enterprise/module/auth/guard/open-api/v1/open-api-organization.guard';
import { V1OpenApiProjectGuard } from '../../enterprise/module/auth/guard/open-api/v1/open-api-project.guard';
import { V1OpenApiGuard } from '../../enterprise/module/auth/guard/open-api/v1/open-api.guard';
import {
  EMAIL_VERIFICATION,
  EMAIL_VERIFICATION_KEY,
  HOST_ACTION_KEY,
  HOST_ACTION_TYPE,
  LICENSE_AUTHROIZE,
  LICENSE_AUTHROIZE_KEY,
  ORGANIZATION_ROLE,
  ORGANIZATION_ROLE_KEY,
  PROJECT_ROLE,
  PROJECT_ROLE_KEY,
  REMOTE_ORGANIZATION_ROLE_KEY,
  REMOTE_PROJECT_ROLE_KEY,
  SELF_HOSTED_ROLE,
  SELF_HOSTED_ROLE_KEY,
} from './auth.types';
import { DeviceAcessGuard } from './guard/device.guard';
import { EmailVerificationGuard } from './guard/email-verification.guard';
import { HostGuard } from './guard/host.guard';
import { OrganizationGuard } from './guard/organization.guard';
import { ProjectGuard } from './guard/project.guard';
import { RemoteOrganizationGuard } from './guard/remote/remote-organization.guard';
import { RemoteProjectGuard } from './guard/remote/remote-project.guard';
import { RemoteGuard } from './guard/remote/remote.guard';
import { SelfHostedRoleGuard } from './guard/self-hosted.guard';
import { UserJwtGuard } from './guard/user-jwt.guard';

export function RemoteOrganizationPermission(roleType: ORGANIZATION_ROLE): PropertyDecorator {
  return applyDecorators(SetMetadata(REMOTE_ORGANIZATION_ROLE_KEY, roleType), UseGuards(RemoteGuard), UseGuards(RemoteOrganizationGuard));
}

export function RemoteProjectPermission(roleType: PROJECT_ROLE): PropertyDecorator {
  return applyDecorators(SetMetadata(REMOTE_PROJECT_ROLE_KEY, roleType), UseGuards(RemoteGuard), UseGuards(RemoteProjectGuard));
}

export function DeviceAccessPermission(): PropertyDecorator {
  return applyDecorators(UseGuards(UserJwtGuard), OrganizationPermission(ORGANIZATION_ROLE.MEMBER), UseGuards(DeviceAcessGuard));
}

export function HostPermission(actionType: HOST_ACTION_TYPE): PropertyDecorator {
  return applyDecorators(SetMetadata(HOST_ACTION_KEY, actionType), UseGuards(HostGuard));
}

export function SelfHostedPermission(roleType: SELF_HOSTED_ROLE): PropertyDecorator {
  return applyDecorators(SetMetadata(SELF_HOSTED_ROLE_KEY, roleType), UseGuards(UserJwtGuard), UseGuards(SelfHostedRoleGuard));
}

export function OrganizationPermission(roleType: ORGANIZATION_ROLE): PropertyDecorator {
  return applyDecorators(SetMetadata(ORGANIZATION_ROLE_KEY, roleType), UseGuards(UserJwtGuard), UseGuards(OrganizationGuard));
}

export function ProjectPermission(roleType: PROJECT_ROLE): PropertyDecorator {
  return applyDecorators(SetMetadata(PROJECT_ROLE_KEY, roleType), UseGuards(UserJwtGuard), UseGuards(ProjectGuard));
}

export function EmailVerification(verificationType: EMAIL_VERIFICATION): PropertyDecorator {
  return applyDecorators(SetMetadata(EMAIL_VERIFICATION_KEY, verificationType), UseGuards(UserJwtGuard), UseGuards(EmailVerificationGuard));
}

export function GoogleOAuth(): PropertyDecorator {
  return applyDecorators(UseGuards(AuthGuard(GOOGLE)));
}

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext): UserPayload => {
  const request = ctx.switchToHttp().getRequest<{ user: UserPayload }>();
  return request.user;
});

export const Host = createParamDecorator((data: unknown, ctx: ExecutionContext): HostPayload => {
  const request = ctx.switchToHttp().getRequest<{ user: HostPayload }>();
  return request.user;
});

export const GoogleUser = createParamDecorator((data: unknown, ctx: ExecutionContext): GoogleOAuthPayload => {
  const request = ctx.switchToHttp().getRequest<{ user: GoogleOAuthPayload }>();
  return request.user;
});

export const RemoteCaller = createParamDecorator((data: unknown, ctx: ExecutionContext): RemotePayload => {
  const request = ctx.switchToHttp().getRequest<{ user: RemotePayload }>();
  return request.user;
});

export function V1OpenApiOrganizationPermission(roleType: ORGANIZATION_ROLE): PropertyDecorator {
  return applyDecorators(SetMetadata(V1_OPEN_API_ORGANIZATION_ROLE_KEY, roleType), UseGuards(V1OpenApiGuard), UseGuards(V1OpenApiOrganizationGuard));
}

export function V1OpenApiProjectPermission(roleType: PROJECT_ROLE): PropertyDecorator {
  return applyDecorators(SetMetadata(V1_OPEN_API_PROJECT_ROLE_KEY, roleType), UseGuards(V1OpenApiGuard), UseGuards(V1OpenApiProjectGuard));
}

export const V1OpenApiCaller = createParamDecorator((data: unknown, ctx: ExecutionContext): V1OpenApiPayload => {
  const request = ctx.switchToHttp().getRequest<{ user: V1OpenApiPayload }>();
  return request.user;
});

export function LicensePermission(roleType: LICENSE_AUTHROIZE): PropertyDecorator {
  return applyDecorators(SetMetadata(LICENSE_AUTHROIZE_KEY, roleType), UseGuards(LicenseGuard));
}
