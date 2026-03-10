import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService, OAuthProfile, OAuthProviderType } from './auth.service';
import { ConfirmPasswordResetDto } from './dto/confirm-password-reset.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { VerifyEmailCodeDto } from './dto/verify-email-code.dto';
import { GithubAuthGuard } from './github-auth.guard';
import { GoogleAuthGuard } from './google-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('github')
  @UseGuards(GithubAuthGuard)
  async githubLogin() {
    // Initiates the GitHub OAuth flow
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    // Initiates the Google OAuth flow
  }

  @Post('github/bind')
  @UseGuards(JwtAuthGuard)
  createGithubBindAuthorization(@Req() req: Request) {
    const user = req.user as { userId: string };
    return this.authService.createGithubBindAuthorization(user.userId);
  }

  @Post('google/bind')
  @UseGuards(JwtAuthGuard)
  createGoogleBindAuthorization(@Req() req: Request) {
    const user = req.user as { userId: string };
    return this.authService.createGoogleBindAuthorization(user.userId);
  }

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async githubLoginCallback(@Req() req: Request, @Res() res: Response) {
    return this.handleOAuthCallback(req, res, 'GITHUB');
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback(@Req() req: Request, @Res() res: Response) {
    return this.handleOAuthCallback(req, res, 'GOOGLE');
  }

  @Post('register')
  register(@Req() req: Request, @Body() payload: RegisterDto) {
    return this.authService.register(payload, req.ip);
  }

  @Post('login')
  loginWithPassword(@Req() req: Request, @Body() payload: LoginDto) {
    return this.authService.loginWithPassword(payload, req.ip);
  }

  @Get('email/verify')
  verifyEmailByToken(@Query('token') token: string) {
    return this.authService.verifyEmailByToken(token || '');
  }

  @Post('email/verify-code')
  verifyEmailByCode(@Body() payload: VerifyEmailCodeDto) {
    return this.authService.verifyEmailByCode(payload.email, payload.code);
  }

  @Post('email/resend')
  resendEmailVerification(@Body() payload: ResendVerificationDto) {
    return this.authService.resendEmailVerification(payload.email);
  }

  @Post('password-reset/confirm')
  confirmPasswordReset(@Body() payload: ConfirmPasswordResetDto) {
    return this.authService.confirmPasswordReset(payload);
  }

  @Get('captcha/config')
  getCaptchaConfig() {
    return this.authService.getCaptchaConfig();
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: Request): {
    userId: string;
    username: string;
    role: string;
    avatar: string | null;
    email?: string | null;
    pendingEmail?: string | null;
    pendingEmailPurpose?: 'EMAIL_CHANGE' | 'LOCAL_BIND' | null;
    emailVerified?: boolean;
    emailVerifyRequired?: boolean;
    mailEnabled?: boolean;
    emailVerificationEnforced?: boolean;
    verificationRequiredNow?: boolean;
    status?: 'ACTIVE' | 'BANNED' | 'PENDING';
    authProvider?: 'GITHUB' | 'GOOGLE' | 'LOCAL' | 'MIXED';
    accountType?: 'GITHUB' | 'GOOGLE' | 'LOCAL' | 'MIXED';
    authProviders?: Array<'LOCAL' | 'GITHUB' | 'GOOGLE'>;
  } {
    return req.user as {
      userId: string;
      username: string;
      role: string;
      avatar: string | null;
      email?: string | null;
      pendingEmail?: string | null;
      pendingEmailPurpose?: 'EMAIL_CHANGE' | 'LOCAL_BIND' | null;
      emailVerified?: boolean;
      emailVerifyRequired?: boolean;
      mailEnabled?: boolean;
      emailVerificationEnforced?: boolean;
      verificationRequiredNow?: boolean;
      status?: 'ACTIVE' | 'BANNED' | 'PENDING';
      authProvider?: 'GITHUB' | 'GOOGLE' | 'LOCAL' | 'MIXED';
      accountType?: 'GITHUB' | 'GOOGLE' | 'LOCAL' | 'MIXED';
      authProviders?: Array<'LOCAL' | 'GITHUB' | 'GOOGLE'>;
    };
  }

  private async handleOAuthCallback(
    req: Request,
    res: Response,
    provider: OAuthProviderType,
  ) {
    const profile = req.user as OAuthProfile;
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const state =
      typeof req.query.state === 'string' ? req.query.state.trim() : '';
    const providerKey = provider.toLowerCase();

    if (state && this.authService.isOAuthBindState(state)) {
      try {
        await this.authService.bindOAuthAccountWithState(
          state,
          provider,
          profile,
        );
        res.redirect(
          `${frontendUrl}/auth/callback?bind=success&provider=${providerKey}`,
        );
      } catch (error) {
        const reason = this.resolveErrorReason(error);
        res.redirect(
          `${frontendUrl}/auth/callback?bind=error&provider=${providerKey}&reason=${encodeURIComponent(reason)}`,
        );
      }
      return;
    }
    try {
      const jwt = await this.authService.handleOAuthLogin(provider, profile);
      res.redirect(`${frontendUrl}/auth/callback?token=${jwt.access_token}`);
    } catch (error) {
      const reason = this.resolveErrorReason(error);
      res.redirect(
        `${frontendUrl}/auth/callback?oauth=error&provider=${providerKey}&reason=${encodeURIComponent(reason)}`,
      );
    }
  }

  private resolveErrorReason(error: unknown) {
    const responseMessage = (
      error as { response?: { message?: string | string[] } }
    ).response?.message;
    if (Array.isArray(responseMessage)) {
      return responseMessage[0] || 'UNKNOWN_ERROR';
    }

    if (typeof responseMessage === 'string' && responseMessage.trim()) {
      return responseMessage;
    }

    const message = (error as { message?: string }).message;
    if (typeof message === 'string' && message.trim()) {
      return message;
    }

    return 'UNKNOWN_ERROR';
  }
}
