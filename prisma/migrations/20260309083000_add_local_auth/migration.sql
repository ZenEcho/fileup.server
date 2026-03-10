-- AlterTable
ALTER TABLE `User`
  MODIFY `githubId` VARCHAR(191) NULL,
  ADD COLUMN `email` VARCHAR(191) NULL,
  ADD COLUMN `passwordHash` VARCHAR(255) NULL,
  ADD COLUMN `status` ENUM('ACTIVE', 'DISABLED') NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
