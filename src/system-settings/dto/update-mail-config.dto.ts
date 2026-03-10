import { MailProvider } from '../../prisma/prisma-client';

export class UpdateMailConfigDto {
  provider?: MailProvider;
  smtpHost?: string;
  smtpPort?: number;
  smtpSecure?: boolean;
  smtpUser?: string;
  smtpPass?: string;
  clearSmtpPass?: boolean;
  fromEmail?: string;
  fromName?: string;
  enabled?: boolean;
}
