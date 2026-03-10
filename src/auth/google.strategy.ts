import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as GoogleOAuthStrategy } from 'passport-google-oauth20';

interface GoogleProfile {
  id: string;
  displayName?: string;
  name?: {
    givenName?: string;
  };
  emails?: Array<{ value?: string | null }>;
  photos?: Array<{ value?: string | null }>;
  _json?: {
    email_verified?: boolean;
  };
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  GoogleOAuthStrategy,
  'google',
) {
  constructor(private configService: ConfigService) {
    super({
      clientID:
        configService.get<string>('GOOGLE_CLIENT_ID') || 'dummy_google_id',
      clientSecret:
        configService.get<string>('GOOGLE_CLIENT_SECRET') ||
        'dummy_google_secret',
      callbackURL:
        configService.get<string>('GOOGLE_CALLBACK_URL') ||
        'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done: (err: Error | null, user?: object | false) => void,
  ) {
    void accessToken;
    void refreshToken;

    const email = profile.emails?.[0]?.value?.trim().toLowerCase() || null;
    const avatar = profile.photos?.[0]?.value || null;
    const usernameFallback =
      email?.split('@')[0] || profile.id.slice(-8) || 'google_user';
    const username =
      profile.displayName?.trim() ||
      profile.name?.givenName?.trim() ||
      usernameFallback;
    const emailVerified = Boolean(profile._json?.email_verified);

    done(null, {
      id: profile.id,
      username,
      avatar,
      email,
      emailVerified,
    });
  }
}
