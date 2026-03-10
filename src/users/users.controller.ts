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
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthUser } from '../common/types/auth-user.type';
import { Role } from '../prisma/prisma-client';
import { ChangeMyPasswordDto } from './dto/change-my-password.dto';
import { RequestEmailChangeDto } from './dto/request-email-change.dto';
import { RequestLocalBindDto } from './dto/request-local-bind.dto';
import { UpdateMyProfileDto } from './dto/update-my-profile.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me/profile')
  getMyProfile(@Req() req: Request) {
    const user = req.user as AuthUser;
    return this.usersService.getMyProfile(user.userId);
  }

  @Patch('me/profile')
  updateMyProfile(@Req() req: Request, @Body() payload: UpdateMyProfileDto) {
    const user = req.user as AuthUser;
    return this.usersService.updateMyProfile(user.userId, payload);
  }

  @Patch('me/password')
  changeMyPassword(@Req() req: Request, @Body() payload: ChangeMyPasswordDto) {
    const user = req.user as AuthUser;
    return this.usersService.changeMyPassword(user.userId, payload);
  }

  @Post('me/email-change/request')
  requestMyEmailChange(
    @Req() req: Request,
    @Body() payload: RequestEmailChangeDto,
  ) {
    const user = req.user as AuthUser;
    return this.usersService.requestMyEmailChange(user.userId, payload.email);
  }

  @Post('me/email-change/resend')
  resendMyEmailChangeVerification(@Req() req: Request) {
    const user = req.user as AuthUser;
    return this.usersService.resendMyEmailChangeVerification(user.userId);
  }

  @Post('me/local-bind/request')
  requestMyLocalBind(
    @Req() req: Request,
    @Body() payload: RequestLocalBindDto,
  ) {
    const user = req.user as AuthUser;
    return this.usersService.requestMyLocalBind(user.userId, payload);
  }

  @Post('me/local-bind/resend')
  resendMyLocalBindVerification(@Req() req: Request) {
    const user = req.user as AuthUser;
    return this.usersService.resendMyLocalBindVerification(user.userId);
  }

  @Post('me/resend-verification')
  resendMyVerification(@Req() req: Request) {
    const user = req.user as AuthUser;
    return this.usersService.resendMyVerification(user.userId);
  }

  @Delete('me/oauth/:provider')
  unbindMyOAuthProvider(
    @Req() req: Request,
    @Param('provider') provider: string,
  ) {
    const user = req.user as AuthUser;
    return this.usersService.unbindMyOAuthProvider(
      user.userId,
      this.normalizeOAuthProvider(provider),
    );
  }

  // Legacy compatibility endpoint, keep existing frontend/admin integrations working.
  @Get('admin/list')
  findAllForAdmin(@Req() req: Request) {
    this.assertAdmin(req.user as AuthUser);
    return this.usersService.findAllForAdmin();
  }

  // Legacy compatibility endpoint, prefer PATCH /admin/users/:id/role.
  @Patch(':id/role')
  updateRole(
    @Req() req: Request,
    @Param('id') id: string,
    @Body('role') role: Role,
  ) {
    const user = req.user as AuthUser;
    this.assertAdmin(user);

    if (role !== 'ADMIN' && role !== 'DEVELOPER') {
      throw new BadRequestException('USER_ROLE_INVALID');
    }

    return this.usersService.updateRoleByAdmin(user.userId, id, role);
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
