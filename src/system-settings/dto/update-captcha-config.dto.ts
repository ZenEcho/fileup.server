import { CaptchaProvider } from '../../prisma/prisma-client';

export class UpdateCaptchaConfigDto {
  provider?: CaptchaProvider;
  siteKey?: string;
  secret?: string;
  clearSecret?: boolean;
  enabled?: boolean;
  registerEnabled?: boolean;
  loginEnabled?: boolean;
  scoreThreshold?: number;
}
