-- CreateTable
CREATE TABLE `PluginReview` (
    `id` VARCHAR(191) NOT NULL,
    `pluginId` VARCHAR(100) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `authorReply` TEXT NULL,
    `authorReplyById` VARCHAR(191) NULL,
    `authorReplyAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `PluginReview_pluginId_createdAt_idx`(`pluginId`, `createdAt`),
    INDEX `PluginReview_pluginId_userId_idx`(`pluginId`, `userId`(149)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PluginReviewReply` (
    `id` VARCHAR(191) NOT NULL,
    `reviewId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `PluginReviewReply_reviewId_createdAt_idx`(`reviewId`, `createdAt`),
    INDEX `PluginReviewReply_userId_createdAt_idx`(`userId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PluginReview` ADD CONSTRAINT `PluginReview_pluginId_fkey` FOREIGN KEY (`pluginId`) REFERENCES `Plugin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PluginReview` ADD CONSTRAINT `PluginReview_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PluginReview` ADD CONSTRAINT `PluginReview_authorReplyById_fkey` FOREIGN KEY (`authorReplyById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PluginReviewReply` ADD CONSTRAINT `PluginReviewReply_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `PluginReview`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PluginReviewReply` ADD CONSTRAINT `PluginReviewReply_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
