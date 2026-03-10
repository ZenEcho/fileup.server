-- Alter Plugin table for active version management
ALTER TABLE `Plugin`
  ADD COLUMN `activeVersionId` VARCHAR(191) NULL,
  ADD COLUMN `lastVersionActionAt` DATETIME(3) NULL;

-- Alter PluginVersion table for soft delete metadata
ALTER TABLE `PluginVersion`
  ADD COLUMN `deletedAt` DATETIME(3) NULL,
  ADD COLUMN `deletedById` VARCHAR(191) NULL,
  ADD COLUMN `deleteReason` TEXT NULL;

-- Create version action log table
CREATE TABLE `PluginVersionActionLog` (
  `id` VARCHAR(191) NOT NULL,
  `pluginId` VARCHAR(100) NOT NULL,
  `operatorId` VARCHAR(191) NOT NULL,
  `action` ENUM('ROLLBACK', 'DELETE') NOT NULL,
  `fromVersion` VARCHAR(50) NULL,
  `toVersion` VARCHAR(50) NULL,
  `targetVersion` VARCHAR(50) NULL,
  `reason` TEXT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Indexes
CREATE INDEX `Plugin_activeVersionId_idx` ON `Plugin`(`activeVersionId`);
CREATE INDEX `PluginVersion_pluginId_deletedAt_createdAt_idx` ON `PluginVersion`(`pluginId`, `deletedAt`, `createdAt`);
CREATE INDEX `PluginVersion_deletedById_idx` ON `PluginVersion`(`deletedById`);
CREATE INDEX `PluginVersionActionLog_pluginId_createdAt_idx` ON `PluginVersionActionLog`(`pluginId`, `createdAt`);
CREATE INDEX `PluginVersionActionLog_operatorId_createdAt_idx` ON `PluginVersionActionLog`(`operatorId`, `createdAt`);

-- Foreign keys
ALTER TABLE `Plugin` ADD CONSTRAINT `Plugin_activeVersionId_fkey`
  FOREIGN KEY (`activeVersionId`) REFERENCES `PluginVersion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `PluginVersion` ADD CONSTRAINT `PluginVersion_deletedById_fkey`
  FOREIGN KEY (`deletedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `PluginVersionActionLog` ADD CONSTRAINT `PluginVersionActionLog_pluginId_fkey`
  FOREIGN KEY (`pluginId`) REFERENCES `Plugin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `PluginVersionActionLog` ADD CONSTRAINT `PluginVersionActionLog_operatorId_fkey`
  FOREIGN KEY (`operatorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
