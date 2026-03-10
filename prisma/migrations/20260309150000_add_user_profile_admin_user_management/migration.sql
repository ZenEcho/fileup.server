-- AlterTable
ALTER TABLE `User`
  ADD COLUMN `displayName` VARCHAR(100) NULL,
  ADD COLUMN `bio` TEXT NULL,
  ADD COLUMN `adminNote` TEXT NULL,
  ADD COLUMN `lastLoginAt` DATETIME(3) NULL,
  ADD COLUMN `passwordUpdatedAt` DATETIME(3) NULL,
  ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `AdminUserActionLog` (
  `id` VARCHAR(191) NOT NULL,
  `operatorId` VARCHAR(191) NOT NULL,
  `targetUserId` VARCHAR(191) NOT NULL,
  `action` ENUM('UPDATE_PROFILE', 'UPDATE_ROLE', 'UPDATE_STATUS', 'RESEND_VERIFICATION') NOT NULL,
  `detail` TEXT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `AdminUserActionLog_operatorId_createdAt_idx` ON `AdminUserActionLog`(`operatorId`, `createdAt`);
CREATE INDEX `AdminUserActionLog_targetUserId_createdAt_idx` ON `AdminUserActionLog`(`targetUserId`, `createdAt`);

-- AddForeignKey
ALTER TABLE `AdminUserActionLog` ADD CONSTRAINT `AdminUserActionLog_operatorId_fkey`
  FOREIGN KEY (`operatorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `AdminUserActionLog` ADD CONSTRAINT `AdminUserActionLog_targetUserId_fkey`
  FOREIGN KEY (`targetUserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
