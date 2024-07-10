/*
  Warnings:

  - You are about to drop the column `courseCode` on the `Courses` table. All the data in the column will be lost.
  - The primary key for the `EnrollCourse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name,classId]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `EnrollCourse` DROP FOREIGN KEY `EnrollCourse_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Exam` DROP FOREIGN KEY `Exam_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Result` DROP FOREIGN KEY `Result_courseId_fkey`;

-- DropIndex
DROP INDEX `Courses_courseCode_key` ON `Courses`;

-- AlterTable
ALTER TABLE `Courses` DROP COLUMN `courseCode`;

-- AlterTable
ALTER TABLE `EnrollCourse` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Exam` MODIFY `courseId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Result` MODIFY `courseId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Courses_name_classId_key` ON `Courses`(`name`, `classId`);

-- AddForeignKey
ALTER TABLE `EnrollCourse` ADD CONSTRAINT `EnrollCourse_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam` ADD CONSTRAINT `Exam_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `EnrollCourse`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `EnrollCourse`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
