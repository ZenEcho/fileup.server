import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthUser } from '../common/types/auth-user.type';
import { Role } from '../prisma/prisma-client';
import {
  AdminQueryUsersDto,
  AdminUserStatusView,
} from './dto/admin-query-users.dto';
import { AdminUpdateUserRoleDto } from './dto/admin-update-user-role.dto';
import { AdminUpdateUserStatusDto } from './dto/admin-update-user-status.dto';
import { AdminResetPasswordDto } from './dto/admin-reset-password.dto';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';
import { UsersService } from './users.service';

@Controller('admin/users')
@UseGuards(JwtAuthGuard)
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findUsers(
    @Req() req: Request,
    @Query('keyword') keyword?: string,
    @Query('role') role?: Role,
    @Query('status') status?: AdminUserStatusView,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    this.assertAdmin(req.user as AuthUser);

    if (role && role !== 'ADMIN' && role !== 'DEVELOPER') {
      throw new BadRequestException('USER_ROLE_INVALID');
    }

    if (
      status &&
      status !== 'ACTIVE' &&
      status !== 'BANNED' &&
      status !== 'PENDING'
    ) {
      throw new BadRequestException('USER_STATUS_INVALID');
    }

    const query: AdminQueryUsersDto = {
      keyword,
      role,
      status,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    };

    return this.usersService.findAdminUsers(query);
  }

  @Get(':id')
  findUserById(@Req() req: Request, @Param('id') id: string) {
    this.assertAdmin(req.user as AuthUser);
    return this.usersService.findAdminUserById(id);
  }

  @Patch(':id')
  updateUser(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() payload: AdminUpdateUserDto,
  ) {
    const user = req.user as AuthUser;
    this.assertAdmin(user);
    return this.usersService.updateUserByAdmin(user.userId, id, payload);
  }

  @Patch(':id/role')
  updateRole(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() payload: AdminUpdateUserRoleDto,
  ) {
    const user = req.user as AuthUser;
    this.assertAdmin(user);
    return this.usersService.updateRoleByAdmin(user.userId, id, payload.role);
  }

  @Patch(':id/status')
  updateStatus(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() payload: AdminUpdateUserStatusDto,
  ) {
    const user = req.user as AuthUser;
    this.assertAdmin(user);
    return this.usersService.updateStatusByAdmin(
      user.userId,
      id,
      payload.status,
    );
  }

  @Post(':id/password-reset')
  resetPassword(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() payload: AdminResetPasswordDto,
  ) {
    const user = req.user as AuthUser;
    this.assertAdmin(user);
    return this.usersService.resetPasswordByAdmin(user.userId, id, payload);
  }

  @Post(':id/resend-verification')
  resendVerification(@Req() req: Request, @Param('id') id: string) {
    const user = req.user as AuthUser;
    this.assertAdmin(user);
    return this.usersService.resendVerificationByAdmin(user.userId, id);
  }

  @Delete(':id/oauth/:provider')
  forceUnbindOAuthProvider(
    @Req() req: Request,
    @Param('id') id: string,
    @Param('provider') provider: string,
  ) {
    const user = req.user as AuthUser;
    this.assertAdmin(user);
    return this.usersService.forceUnbindOAuthProviderByAdmin(
      user.userId,
      id,
      this.normalizeOAuthProvider(provider),
    );
  }

  private normalizeOAuthProvider(provider: string): 'GITHUB' | 'GOOGLE' {
    const normalized = provider.trim().toUpperCase();
    if (normalized === 'GITHUB' || normalized === 'GOOGLE') {
      return normalized;
    }

    throw new BadRequestException('USER_OAUTH_PROVIDER_INVALID');
  }

  private assertAdmin(user: AuthUser) {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can access this endpoint');
    }
  }
}
