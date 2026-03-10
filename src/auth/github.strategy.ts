import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID') || 'dummy_id',
      clientSecret:
        configService.get<string>('GITHUB_CLIENT_SECRET') || 'dummy_secret',
      callbackURL:
        configService.get<string>('GITHUB_CALLBACK_URL') ||
        'http://localhost:3000/auth/github/callback',
      scope: ['user:email'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: {
      id: string;
      username: string;
      photos?: Array<{ value?: string | null }>;
      emails?: Array<{ value?: string | null; verified?: boolean }>;
    },
    done: (err: Error | null, user?: object | false) => void,
  ) {
    void accessToken;
    void refreshToken;

    const email = profile.emails?.[0]?.value?.trim().toLowerCase() || null;
    const emailVerified = Boolean(profile.emails?.[0]?.verified);

    done(null, {
      id: profile.id,
      username: profile.username,
      avatar: profile.photos?.[0]?.value || null,
      email,
      emailVerified,
    });
  }
}
