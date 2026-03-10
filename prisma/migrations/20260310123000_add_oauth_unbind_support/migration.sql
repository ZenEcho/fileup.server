-- AlterTable
ALTER TABLE `UserOAuthAccount`
  ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN `unboundAt` DATETIME(3) NULL;

-- CreateIndex
CREATE INDEX `UserOAuthAccount_userId_provider_isActive_idx`
  ON `UserOAuthAccount`(`userId`, `provider`, `isActive`);

-- AlterTable
ALTER TABLE `AdminUserActionLog`
  MODIFY `action` ENUM(
    'UPDATE_PROFILE',
    'UPDATE_ROLE',
    'UPDATE_STATUS',
    'RESEND_VERIFICATION',
    'RESET_PASSWORD',
    'FORCE_UNBIND_OAUTH'
  ) NOT NULL;
