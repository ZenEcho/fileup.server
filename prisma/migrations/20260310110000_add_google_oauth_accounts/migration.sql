-- CreateTable
CREATE TABLE `UserOAuthAccount` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `provider` ENUM('GITHUB', 'GOOGLE') NOT NULL,
  `providerUserId` VARCHAR(191) NOT NULL,
  `providerEmail` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,

  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `UserOAuthAccount_provider_providerUserId_key` ON `UserOAuthAccount`(`provider`, `providerUserId`);
CREATE UNIQUE INDEX `UserOAuthAccount_provider_userId_key` ON `UserOAuthAccount`(`provider`, `userId`);
CREATE INDEX `UserOAuthAccount_userId_createdAt_idx` ON `UserOAuthAccount`(`userId`, `createdAt`);
CREATE INDEX `UserOAuthAccount_providerEmail_idx` ON `UserOAuthAccount`(`providerEmail`);

-- AddForeignKey
ALTER TABLE `UserOAuthAccount` ADD CONSTRAINT `UserOAuthAccount_userId_fkey`
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Backfill existing GitHub bindings for compatibility
INSERT IGNORE INTO `UserOAuthAccount` (
  `id`,
  `userId`,
  `provider`,
  `providerUserId`,
  `providerEmail`,
  `createdAt`,
  `updatedAt`
)
SELECT
  UUID(),
  `id`,
  'GITHUB',
  `githubId`,
  `email`,
  NOW(3),
  NOW(3)
FROM `User`
WHERE `githubId` IS NOT NULL AND `githubId` <> '';
