/*
  Warnings:

  - You are about to drop the column `day` on the `timeslot` table. All the data in the column will be lost.
  - You are about to drop the column `routineId` on the `timeslot` table. All the data in the column will be lost.
  - You are about to drop the `routine` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dayId` to the `timeslot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `routine` DROP FOREIGN KEY `routine_sectionName_fkey`;

-- DropForeignKey
ALTER TABLE `timeslot` DROP FOREIGN KEY `timeslot_routineId_fkey`;

-- AlterTable
ALTER TABLE `timeslot` DROP COLUMN `day`,
    DROP COLUMN `routineId`,
    ADD COLUMN `dayId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `routine`;

-- CreateTable
CREATE TABLE `days` (
    `id` VARCHAR(191) NOT NULL,
    `day` ENUM('SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY') NOT NULL DEFAULT 'SATURDAY',
    `sectionId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `days_sectionId_key`(`sectionId`),
    UNIQUE INDEX `days_day_sectionId_key`(`day`, `sectionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `timeslot` ADD CONSTRAINT `timeslot_dayId_fkey` FOREIGN KEY (`dayId`) REFERENCES `days`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `days` ADD CONSTRAINT `days_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `section`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
