/*
  Warnings:

  - You are about to drop the column `classId` on the `Course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseName]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_classId_fkey`;

-- DropForeignKey
ALTER TABLE `Lesson` DROP FOREIGN KEY `Lesson_courseId_fkey`;

-- DropIndex
DROP INDEX `Course_courseName_classId_key` ON `Course`;

-- AlterTable
ALTER TABLE `Course` DROP COLUMN `classId`,
    ADD COLUMN `mark` INTEGER NOT NULL DEFAULT 100;

-- CreateTable
CREATE TABLE `ClassCourse` (
    `id` VARCHAR(191) NOT NULL,
    `classId` INTEGER NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `syllabus` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ClassCourse_courseId_classId_key`(`courseId`, `classId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Course_courseName_key` ON `Course`(`courseName`);

-- AddForeignKey
ALTER TABLE `ClassCourse` ADD CONSTRAINT `ClassCourse_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassCourse` ADD CONSTRAINT `ClassCourse_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `ClassCourse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
