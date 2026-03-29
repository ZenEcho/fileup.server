import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'node:crypto';

const DISALLOWED_JWT_SECRETS = new Set([
  'secretKey',
  'secret',
  'changeme',
  'change-me',
  'default',
  'jwt-secret',
  'your_jwt_secret',
]);

const MIN_JWT_SECRET_LENGTH = 32;
let generatedDevJwtSecret: string | null = null;
let hasWarnedAboutDevJwtSecret = false;

export function getRequiredJwtSecret(configService: ConfigService) {
  const secret = configService.get<string>('JWT_SECRET')?.trim();
  const nodeEnv = configService.get<string>('NODE_ENV')?.trim().toLowerCase();
  const isProduction = nodeEnv === 'production';

  const isWeakSecret =
    !secret ||
    secret.length < MIN_JWT_SECRET_LENGTH ||
    DISALLOWED_JWT_SECRETS.has(secret);

  if (!isWeakSecret) {
    return secret;
  }

  if (isProduction) {
    if (!secret) {
      throw new Error(
        'JWT_SECRET is required and must be configured before the server starts.',
      );
    }

    throw new Error(
      `JWT_SECRET must be at least ${MIN_JWT_SECRET_LENGTH} characters and not use a weak default value.`,
    );
  }

  if (!generatedDevJwtSecret) {
    generatedDevJwtSecret = randomBytes(48).toString('base64url');
  }

  if (!hasWarnedAboutDevJwtSecret) {
    hasWarnedAboutDevJwtSecret = true;
    console.warn(
      '[auth] Using an ephemeral development JWT secret because JWT_SECRET is missing or weak. Set a strong JWT_SECRET to keep sessions stable across restarts.',
    );
  }

  return generatedDevJwtSecret;
}
