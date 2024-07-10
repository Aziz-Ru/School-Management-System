/*
  Warnings:

  - A unique constraint covering the columns `[courseId]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseId,classId]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseId` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Courses_name_classId_key` ON `Courses`;

-- AlterTable
ALTER TABLE `Courses` ADD COLUMN `courseId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Courses_courseId_key` ON `Courses`(`courseId`);

-- CreateIndex
CREATE UNIQUE INDEX `Courses_courseId_classId_key` ON `Courses`(`courseId`, `classId`);
