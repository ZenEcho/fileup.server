import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthUser } from '../common/types/auth-user.type';
import { TestMailConfigDto } from './dto/test-mail-config.dto';
import { UpdateCaptchaConfigDto } from './dto/update-captcha-config.dto';
import { UpdateMailConfigDto } from './dto/update-mail-config.dto';
import { MailerService } from './mailer.service';
import { SystemSettingsService } from './system-settings.service';

@Controller('admin/settings')
@UseGuards(JwtAuthGuard)
export class SystemSettingsController {
  constructor(
    private readonly systemSettingsService: SystemSettingsService,
    private readonly mailerService: MailerService,
  ) {}

  @Get('mail')
  async getMailConfig(@Req() req: Request) {
    this.assertAdmin(req.user as AuthUser);
    return this.systemSettingsService.getMailConfig();
  }

  @Patch('mail')
  async updateMailConfig(
    @Req() req: Request,
    @Body() payload: UpdateMailConfigDto,
  ) {
    const user = req.user as AuthUser;
    this.assertAdmin(user);
    return this.systemSettingsService.updateMailConfig(payload, user.userId);
  }

  @Post('mail/test')
  async testMailConfig(
    @Req() req: Request,
    @Body() payload: TestMailConfigDto,
  ) {
    const user = req.user as AuthUser;
    this.assertAdmin(user);

    return this.mailerService.sendTestEmail({
      to: payload.toEmail,
      subject: payload.subject,
      operatorId: user.userId,
    });
  }

  @Get('captcha')
  async getCaptchaConfig(@Req() req: Request) {
    this.assertAdmin(req.user as AuthUser);
    return this.systemSettingsService.getCaptchaConfig();
  }

  @Patch('captcha')
  async updateCaptchaConfig(
    @Req() req: Request,
    @Body() payload: UpdateCaptchaConfigDto,
  ) {
    const user = req.user as AuthUser;
    this.assertAdmin(user);
    return this.systemSettingsService.updateCaptchaConfig(payload, user.userId);
  }

  private assertAdmin(user: AuthUser) {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can access system settings');
    }
  }
}
