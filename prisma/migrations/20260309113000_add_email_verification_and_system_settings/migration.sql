-- AlterTable
ALTER TABLE `User`
  ADD COLUMN `emailVerifiedAt` DATETIME(3) NULL,
  ADD COLUMN `emailVerifyRequired` BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN `lastVerificationSentAt` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `EmailVerificationToken` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `tokenHash` VARCHAR(255) NOT NULL,
  `codeHash` VARCHAR(255) NOT NULL,
  `expiresAt` DATETIME(3) NOT NULL,
  `consumedAt` DATETIME(3) NULL,
  `sendCount` INTEGER NOT NULL DEFAULT 1,
  `lastSentAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SystemMailConfig` (
  `id` VARCHAR(191) NOT NULL DEFAULT 'default',
  `provider` ENUM('SMTP') NOT NULL DEFAULT 'SMTP',
  `smtpHost` VARCHAR(255) NULL,
  `smtpPort` INTEGER NULL,
  `smtpSecure` BOOLEAN NOT NULL DEFAULT false,
  `smtpUser` VARCHAR(255) NULL,
  `smtpPassEncrypted` TEXT NULL,
  `fromEmail` VARCHAR(255) NULL,
  `fromName` VARCHAR(255) NULL,
  `enabled` BOOLEAN NOT NULL DEFAULT false,
  `updatedById` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,

  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SystemCaptchaConfig` (
  `id` VARCHAR(191) NOT NULL DEFAULT 'default',
  `provider` ENUM('TURNSTILE', 'RECAPTCHA') NOT NULL DEFAULT 'TURNSTILE',
  `siteKey` VARCHAR(255) NULL,
  `secretEncrypted` TEXT NULL,
  `registerEnabled` BOOLEAN NOT NULL DEFAULT true,
  `loginEnabled` BOOLEAN NOT NULL DEFAULT false,
  `scoreThreshold` DOUBLE NOT NULL DEFAULT 0.5,
  `enabled` BOOLEAN NOT NULL DEFAULT false,
  `updatedById` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,

  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SystemConfigAuditLog` (
  `id` VARCHAR(191) NOT NULL,
  `category` ENUM('MAIL', 'CAPTCHA') NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `operatorId` VARCHAR(191) NULL,
  `success` BOOLEAN NOT NULL DEFAULT true,
  `detail` TEXT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `EmailVerificationToken_userId_createdAt_idx` ON `EmailVerificationToken`(`userId`, `createdAt`);
CREATE INDEX `EmailVerificationToken_email_createdAt_idx` ON `EmailVerificationToken`(`email`, `createdAt`);
CREATE INDEX `EmailVerificationToken_expiresAt_idx` ON `EmailVerificationToken`(`expiresAt`);
CREATE INDEX `SystemMailConfig_updatedById_idx` ON `SystemMailConfig`(`updatedById`);
CREATE INDEX `SystemCaptchaConfig_updatedById_idx` ON `SystemCaptchaConfig`(`updatedById`);
CREATE INDEX `SystemConfigAuditLog_category_createdAt_idx` ON `SystemConfigAuditLog`(`category`, `createdAt`);
CREATE INDEX `SystemConfigAuditLog_operatorId_createdAt_idx` ON `SystemConfigAuditLog`(`operatorId`, `createdAt`);

-- AddForeignKey
ALTER TABLE `EmailVerificationToken` ADD CONSTRAINT `EmailVerificationToken_userId_fkey`
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `SystemMailConfig` ADD CONSTRAINT `SystemMailConfig_updatedById_fkey`
  FOREIGN KEY (`updatedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `SystemCaptchaConfig` ADD CONSTRAINT `SystemCaptchaConfig_updatedById_fkey`
  FOREIGN KEY (`updatedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `SystemConfigAuditLog` ADD CONSTRAINT `SystemConfigAuditLog_operatorId_fkey`
  FOREIGN KEY (`operatorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
