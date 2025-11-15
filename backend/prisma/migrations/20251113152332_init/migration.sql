-- CreateTable
CREATE TABLE `User` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `isPrivate` BOOLEAN NOT NULL DEFAULT false,
    `lastMessageAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomMember` (
    `roomId` BIGINT NOT NULL,
    `userId` BIGINT NOT NULL,
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`roomId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `roomId` BIGINT NOT NULL,
    `senderId` BIGINT NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `type` ENUM('TEXT', 'IMAGE', 'FILE') NOT NULL DEFAULT 'TEXT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Message_roomId_idx`(`roomId`),
    INDEX `Message_senderId_idx`(`senderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MessageStatus` (
    `messageId` BIGINT NOT NULL,
    `userId` BIGINT NOT NULL,
    `isSeen` BOOLEAN NOT NULL DEFAULT false,
    `seenAt` DATETIME(3) NULL,

    PRIMARY KEY (`messageId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RoomMember` ADD CONSTRAINT `RoomMember_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomMember` ADD CONSTRAINT `RoomMember_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MessageStatus` ADD CONSTRAINT `MessageStatus_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `Message`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MessageStatus` ADD CONSTRAINT `MessageStatus_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
