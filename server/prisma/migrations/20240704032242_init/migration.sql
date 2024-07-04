/*
  Warnings:

  - The primary key for the `School` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `School` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `Classes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EnrollClasses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EnrollCourses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Results` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentAttendence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Students` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherAttendence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teachers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[courseCode]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseCode` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Courses` DROP FOREIGN KEY `Courses_classId_fkey`;

-- DropForeignKey
ALTER TABLE `EnrollClasses` DROP FOREIGN KEY `EnrollClasses_classId_fkey`;

-- DropForeignKey
ALTER TABLE `EnrollCourses` DROP FOREIGN KEY `EnrollCourses_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `EnrollCourses` DROP FOREIGN KEY `EnrollCourses_teacherId_fkey`;

-- DropForeignKey
ALTER TABLE `Exams` DROP FOREIGN KEY `Exams_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Results` DROP FOREIGN KEY `Results_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Results` DROP FOREIGN KEY `Results_examId_fkey`;

-- DropForeignKey
ALTER TABLE `Results` DROP FOREIGN KEY `Results_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `StudentAttendence` DROP FOREIGN KEY `StudentAttendence_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `Students` DROP FOREIGN KEY `Students_enrollClassId_fkey`;

-- DropForeignKey
ALTER TABLE `TeacherAttendence` DROP FOREIGN KEY `TeacherAttendence_teacherId_fkey`;

-- AlterTable
ALTER TABLE `Courses` ADD COLUMN `courseCode` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `School` DROP PRIMARY KEY,
    ADD COLUMN `totalTeachers` INTEGER NOT NULL DEFAULT 30,
    MODIFY `id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `Classes`;

-- DropTable
DROP TABLE `EnrollClasses`;

-- DropTable
DROP TABLE `EnrollCourses`;

-- DropTable
DROP TABLE `Exams`;

-- DropTable
DROP TABLE `Results`;

-- DropTable
DROP TABLE `StudentAttendence`;

-- DropTable
DROP TABLE `Students`;

-- DropTable
DROP TABLE `TeacherAttendence`;

-- DropTable
DROP TABLE `Teachers`;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'TEACHER', 'STUDENT') NOT NULL DEFAULT 'STUDENT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_userId_key`(`userId`),
    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_userId_name_key`(`userId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `dob` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `sex` VARCHAR(191) NOT NULL,
    `imageLink` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    UNIQUE INDEX `Profile_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OfficerProfile` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `qualification` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NOT NULL,
    `rank` ENUM('PRINCIPAL', 'VICE_PRINCIPAL', 'TEACHER', 'STAFF') NOT NULL DEFAULT 'TEACHER',
    `salary` DOUBLE NOT NULL DEFAULT 20000.0,

    UNIQUE INDEX `OfficerProfile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentProfile` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `class` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `StudentProfile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classes` (
    `classId` INTEGER NOT NULL,
    `monthlyFee` DOUBLE NOT NULL DEFAULT 1000.0,
    `totalStudents` INTEGER NOT NULL DEFAULT 50,
    `totalCourses` INTEGER NOT NULL DEFAULT 10,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`classId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnrollClass` (
    `year` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `classId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `EnrollClass_userId_key`(`userId`),
    UNIQUE INDEX `EnrollClass_year_userId_key`(`year`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnrollCourse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `EnrollCourse_userId_year_key`(`userId`, `year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exam` (
    `id` VARCHAR(191) NOT NULL,
    `examId` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `courseId` INTEGER NOT NULL,
    `type` ENUM('MidTerm', 'Final', 'Quiz', 'Assignment') NOT NULL DEFAULT 'Final',

    UNIQUE INDEX `Exam_examId_key`(`examId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Result` (
    `id` VARCHAR(191) NOT NULL,
    `courseId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `examId` VARCHAR(191) NOT NULL,
    `marks` DOUBLE NOT NULL DEFAULT 33.0,
    `grade` VARCHAR(191) NULL DEFAULT 'A+',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Result_userId_courseId_examId_key`(`userId`, `courseId`, `examId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendence` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `date` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Courses_courseCode_key` ON `Courses`(`courseCode`);

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OfficerProfile` ADD CONSTRAINT `OfficerProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Profile`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentProfile` ADD CONSTRAINT `StudentProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Profile`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `classes`(`classId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnrollClass` ADD CONSTRAINT `EnrollClass_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnrollClass` ADD CONSTRAINT `EnrollClass_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `classes`(`classId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnrollCourse` ADD CONSTRAINT `EnrollCourse_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`courseCode`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnrollCourse` ADD CONSTRAINT `EnrollCourse_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam` ADD CONSTRAINT `Exam_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `EnrollCourse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `Exam`(`examId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `EnrollCourse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendence` ADD CONSTRAINT `Attendence_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
