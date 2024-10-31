/*
  Warnings:

  - You are about to drop the `lesson` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `lesson` DROP FOREIGN KEY `lesson_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `lesson` DROP FOREIGN KEY `lesson_sectionId_fkey`;

-- DropForeignKey
ALTER TABLE `lesson` DROP FOREIGN KEY `lesson_teacherId_fkey`;

-- DropTable
DROP TABLE `lesson`;

-- CreateTable
CREATE TABLE `schedule` (
    `id` VARCHAR(191) NOT NULL,
    `startEnd` VARCHAR(191) NOT NULL,
    `sectionId` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NULL,
    `teacherId` INTEGER NOT NULL,

    UNIQUE INDEX `schedule_teacherId_startEnd_key`(`teacherId`, `startEnd`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `section`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `sectionSubject`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `teacher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
