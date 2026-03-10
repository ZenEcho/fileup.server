-- AlterTable
ALTER TABLE `User`
  ADD COLUMN `pendingEmail` VARCHAR(191) NULL,
  ADD COLUMN `pendingEmailPurpose` ENUM('EMAIL_CHANGE', 'LOCAL_BIND') NULL,
  ADD COLUMN `pendingPasswordHash` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `EmailVerificationToken`
  ADD COLUMN `purpose` ENUM('REGISTER', 'EMAIL_CHANGE', 'LOCAL_BIND') NOT NULL DEFAULT 'REGISTER';

-- AlterTable
ALTER TABLE `AdminUserActionLog`
  MODIFY `action` ENUM('UPDATE_PROFILE', 'UPDATE_ROLE', 'UPDATE_STATUS', 'RESEND_VERIFICATION', 'RESET_PASSWORD') NOT NULL;

-- CreateTable
CREATE TABLE `PasswordResetToken` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `tokenHash` CHAR(64) NOT NULL,
  `expiresAt` DATETIME(3) NOT NULL,
  `consumedAt` DATETIME(3) NULL,
  `createdByAdminId` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_pendingEmail_key` ON `User`(`pendingEmail`);
CREATE INDEX `EmailVerificationToken_userId_purpose_createdAt_idx` ON `EmailVerificationToken`(`userId`, `purpose`, `createdAt`);
CREATE INDEX `EmailVerificationToken_email_purpose_createdAt_idx` ON `EmailVerificationToken`(`email`, `purpose`, `createdAt`);
CREATE INDEX `PasswordResetToken_userId_createdAt_idx` ON `PasswordResetToken`(`userId`, `createdAt`);
CREATE INDEX `PasswordResetToken_tokenHash_idx` ON `PasswordResetToken`(`tokenHash`);
CREATE INDEX `PasswordResetToken_expiresAt_idx` ON `PasswordResetToken`(`expiresAt`);
CREATE INDEX `PasswordResetToken_createdByAdminId_createdAt_idx` ON `PasswordResetToken`(`createdByAdminId`, `createdAt`);

-- AddForeignKey
ALTER TABLE `PasswordResetToken` ADD CONSTRAINT `PasswordResetToken_userId_fkey`
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `PasswordResetToken` ADD CONSTRAINT `PasswordResetToken_createdByAdminId_fkey`
  FOREIGN KEY (`createdByAdminId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

