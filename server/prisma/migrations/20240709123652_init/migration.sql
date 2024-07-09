/*
  Warnings:

  - The primary key for the `classes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Courses` DROP FOREIGN KEY `Courses_classId_fkey`;

-- DropForeignKey
ALTER TABLE `EnrollClass` DROP FOREIGN KEY `EnrollClass_classId_fkey`;

-- AlterTable
ALTER TABLE `Courses` MODIFY `classId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `EnrollClass` MODIFY `classId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `classes` DROP PRIMARY KEY,
    ADD COLUMN `maximumCourses` INTEGER NOT NULL DEFAULT 10,
    ADD COLUMN `maximumStudents` INTEGER NOT NULL DEFAULT 100,
    MODIFY `classId` VARCHAR(191) NOT NULL,
    ALTER COLUMN `totalStudents` DROP DEFAULT,
    ALTER COLUMN `totalCourses` DROP DEFAULT,
    ADD PRIMARY KEY (`classId`);

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `classes`(`classId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnrollClass` ADD CONSTRAINT `EnrollClass_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `classes`(`classId`) ON DELETE CASCADE ON UPDATE CASCADE;
