/*
  Warnings:

  - You are about to drop the column `message` on the `authority` table. All the data in the column will be lost.
  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `authority` DROP COLUMN `message`;

-- DropTable
DROP TABLE `events`;

-- CreateTable
CREATE TABLE `message` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `authority`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
