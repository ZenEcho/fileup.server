import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CaptchaProvider } from '../prisma/prisma-client';
import { SystemSettingsService } from './system-settings.service';

export type CaptchaAction = 'register' | 'login';

interface CaptchaVerifyResponse {
  success: boolean;
  score?: number;
  ['error-codes']?: string[];
}

@Injectable()
export class CaptchaService {
  constructor(private readonly settingsService: SystemSettingsService) {}

  async getPublicConfig() {
    const config = await this.settingsService.getCaptchaConfig();
    return {
      enabled: config.enabled,
      provider: config.provider,
      siteKey: config.siteKey,
      registerEnabled: config.registerEnabled,
      loginEnabled: config.loginEnabled,
    };
  }

  async validateCaptcha(
    action: CaptchaAction,
    token: string | undefined,
    remoteIp?: string,
  ) {
    const config = await this.settingsService.getCaptchaSecretConfig();

    if (!config.enabled) {
      return;
    }

    if (action === 'register' && !config.registerEnabled) {
      return;
    }

    if (action === 'login' && !config.loginEnabled) {
      return;
    }

    const captchaToken = (token || '').trim();
    if (!captchaToken) {
      throw new BadRequestException('captchaToken is required');
    }

    if (!config.siteKey || !config.secret) {
      throw new BadRequestException(
        'Captcha config is incomplete, missing siteKey or secret',
      );
    }

    const result =
      config.provider === CaptchaProvider.RECAPTCHA
        ? await this.verifyRecaptcha(config.secret, captchaToken, remoteIp)
        : await this.verifyTurnstile(config.secret, captchaToken, remoteIp);

    if (!result.success) {
      throw new UnauthorizedException(
        `Captcha validation failed${
          result['error-codes']?.length
            ? `: ${result['error-codes'].join(',')}`
            : ''
        }`,
      );
    }

    if (
      typeof result.score === 'number' &&
      result.score < config.scoreThreshold
    ) {
      throw new UnauthorizedException('Captcha score too low');
    }
  }

  private async verifyTurnstile(
    secret: string,
    token: string,
    remoteIp?: string,
  ): Promise<CaptchaVerifyResponse> {
    const body = new URLSearchParams({
      secret,
      response: token,
    });

    if (remoteIp) {
      body.set('remoteip', remoteIp);
    }

    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body,
      },
    );

    if (!res.ok) {
      throw new UnauthorizedException('Captcha provider request failed');
    }

    return (await res.json()) as CaptchaVerifyResponse;
  }

  private async verifyRecaptcha(
    secret: string,
    token: string,
    remoteIp?: string,
  ): Promise<CaptchaVerifyResponse> {
    const body = new URLSearchParams({
      secret,
      response: token,
    });

    if (remoteIp) {
      body.set('remoteip', remoteIp);
    }

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body,
    });

    if (!res.ok) {
      throw new UnauthorizedException('Captcha provider request failed');
    }

    return (await res.json()) as CaptchaVerifyResponse;
  }
}
