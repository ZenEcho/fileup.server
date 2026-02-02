-- DropIndex
DROP INDEX `Plugin_authorId_fkey` ON `plugin`;

-- DropIndex
DROP INDEX `PluginVersion_auditorId_fkey` ON `pluginversion`;

-- AlterTable
ALTER TABLE `plugin` ADD COLUMN `adminDisabled` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Plugin` ADD CONSTRAINT `Plugin_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PluginVersion` ADD CONSTRAINT `PluginVersion_pluginId_fkey` FOREIGN KEY (`pluginId`) REFERENCES `Plugin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PluginVersion` ADD CONSTRAINT `PluginVersion_auditorId_fkey` FOREIGN KEY (`auditorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
