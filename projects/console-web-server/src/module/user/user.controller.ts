import { OrganizationBase, UserPropCamel, UserResponse } from '@dogu-private/console';
import { OrganizationId, UserId, UserPayload } from '@dogu-private/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { EMAIL_VERIFICATION, ORGANIZATION_ROLE } from '../../module/auth/auth.types';
import { EmailVerification, OrganizationPermission, User } from '../../module/auth/decorators';
import { UserService } from '../../module/user/user.service';
import { clearSignCookiesInResponse } from '../../utils/cookie';
import { ImageFileParser } from '../../utils/file';
import { Page } from '../common/dto/pagination/page';
import { PageDto } from '../common/dto/pagination/page.dto';
import { UpdateUserEmailPreferenceDto } from './dto/user-email-preference.dto';
import { ResetPasswordDto, UpdateTutorialDto, UpdateUserDto } from './dto/user.dto';
import { UserEmailPreferenceService } from './user-email-preference.service';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(UserEmailPreferenceService)
    private readonly userEmailPreferenceService: UserEmailPreferenceService,
  ) {}

  // @Patch('record/last-organization')
  // @OrganizationPermission(ORGANIZATION_ROLE.MEMBER)
  // async updateLastAccess(@User() userPayLoad: UserPayload, @Body() dto: UpdateLastOrganizationDto): Promise<void> {
  //   const rv = await this.userService.updateLastAccess(userPayLoad.userId, dto.organizationId);
  //   return rv;
  // }

  @Get(':userId')
  @EmailVerification(EMAIL_VERIFICATION.UNVERIFIED)
  async findUser(@Param('userId') userId: UserId, @User() user: UserPayload): Promise<UserResponse> {
    if (userId !== user.userId) {
      throw new HttpException(`This user is not same with request user. user: ${userId}`, HttpStatus.UNAUTHORIZED);
    }
    const rv = await this.userService.findOneByIdWithDetail(userId);
    return rv;
  }

  @Get(':userId/access-token')
  @EmailVerification(EMAIL_VERIFICATION.UNVERIFIED)
  async findAccessToken(
    @User() userPayload: UserPayload, //
    @Param(UserPropCamel.userId) userId: UserId,
  ): Promise<string> {
    if (userId !== userPayload.userId) {
      throw new HttpException(`This user is not same with request user. user: ${userId}`, HttpStatus.UNAUTHORIZED);
    }
    const rv = await this.userService.findPersonalAccessToken(userPayload.userId);
    return rv;
  }

  @Post(':userId/access-token')
  @EmailVerification(EMAIL_VERIFICATION.UNVERIFIED)
  async regenerateAccessToken(
    @User() userPayload: UserPayload, //
    @Param(UserPropCamel.userId) userId: UserId,
  ): Promise<string> {
    if (userId !== userPayload.userId) {
      throw new HttpException(`This user is not same with request user. user: ${userId}`, HttpStatus.UNAUTHORIZED);
    }
    const rv = await this.userService.regeneratePersonalAccessToken(userPayload.userId);
    return rv;
  }

  @Delete(':userId/access-token')
  @EmailVerification(EMAIL_VERIFICATION.UNVERIFIED)
  async softRemoveAccessToken(
    @User() userPayload: UserPayload, //
    @Param(UserPropCamel.userId) userId: UserId,
  ): Promise<void> {
    if (userId !== userPayload.userId) {
      throw new HttpException(`This user is not same with request user. user: ${userId}`, HttpStatus.UNAUTHORIZED);
    }
    await this.userService.deletePersonalAccessToken(userPayload.userId);
  }

  @Patch(':userId')
  @EmailVerification(EMAIL_VERIFICATION.UNVERIFIED)
  async updateUser(@Param('userId') userId: UserId, @User() user: UserPayload, @Body() updateUserDto: UpdateUserDto): Promise<UserResponse> {
    if (userId !== user.userId) {
      throw new HttpException(`This user is not same with request user. user: ${userId}`, HttpStatus.UNAUTHORIZED);
    }
    const rv = await this.userService.updateUser(userId, updateUserDto);
    return rv;
  }

  @Post(':userId/image')
  @EmailVerification(EMAIL_VERIFICATION.UNVERIFIED)
  @UseInterceptors(FileInterceptor('image'))
  async updateUserProfileImage(
    @Param('userId') userId: UserId,
    @User() user: UserPayload,
    @UploadedFile(ImageFileParser)
    image: Express.Multer.File,
  ): Promise<UserResponse> {
    if (userId !== user.userId) {
      throw new HttpException(`This user is not same with request user. user: ${userId}`, HttpStatus.UNAUTHORIZED);
    }
    const rv = await this.userService.updateUserProfileImage(userId, image);
    return rv;
  }

  @Patch(':userId/password')
  @EmailVerification(EMAIL_VERIFICATION.UNVERIFIED)
  async resetPassword(@Param('userId') userId: UserId, @User() user: UserPayload, @Body() resetPasswordDto: ResetPasswordDto): Promise<boolean> {
    if (userId !== user.userId) {
      throw new HttpException(`This user is not same with request user. user: ${userId}`, HttpStatus.UNAUTHORIZED);
    }
    const rv = await this.userService.resetPassword(userId, resetPasswordDto);
    return rv;
  }

  @Delete(':userId')
  @EmailVerification(EMAIL_VERIFICATION.UNVERIFIED)
  async removeUser(
    @Param('userId') userId: UserId, //
    @User() user: UserPayload,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    if (userId !== user.userId) {
      throw new UnauthorizedException(`User not matched.`);
    }

    await this.userService.removeUser(user.userId);
    clearSignCookiesInResponse(response);
    return;
  }

  @Get(':userId/organizations')
  @EmailVerification(EMAIL_VERIFICATION.VERIFIED)
  async findOrganizationsByUserId(
    @User() userPayload: UserPayload, //
    @Param(UserPropCamel.userId) userId: UserId,
    @Query() dto: PageDto,
  ): Promise<Page<OrganizationBase>> {
    if (userId !== userPayload.userId) {
      throw new UnauthorizedException(`User not matched.`);
    }
    const rv = await this.userService.findOrganizationsByUserId(userPayload.userId, dto);
    return rv;
  }

  @Delete(':userId/organizations/:organizationId')
  @OrganizationPermission(ORGANIZATION_ROLE.MEMBER)
  async leaveOrganization(@User() userPayload: UserPayload, @Param('userId') userId: UserId, @Param('organizationId') organizationId: OrganizationId): Promise<void> {
    if (userId !== userPayload.userId) {
      throw new UnauthorizedException(`User not matched.`);
    }

    await this.userService.softRemoveUserFromOrganization(organizationId, userId);
  }

  @Patch(':userId/email-preference')
  @EmailVerification(EMAIL_VERIFICATION.UNVERIFIED)
  async updateEmailPreference(@Param('userId') userId: UserId, @User() user: UserPayload, @Body() dto: UpdateUserEmailPreferenceDto): Promise<void> {
    if (userId !== user.userId) {
      throw new UnauthorizedException(`User not matched.`);
    }

    await this.userEmailPreferenceService.updateEmailPreference(userId, dto);
  }

  @Patch(':userId/tutorial')
  @EmailVerification(EMAIL_VERIFICATION.UNVERIFIED)
  async updateTutorialStatus(@Param(UserPropCamel.userId) userId: UserId, @Body() dto: UpdateTutorialDto): Promise<void> {
    return await this.userService.updateTutorialStatus(userId, dto);
  }
}
