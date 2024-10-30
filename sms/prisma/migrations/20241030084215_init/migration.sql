/*
  Warnings:

  - You are about to drop the column `courseId` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the `sectionSubject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `examSubject` DROP FOREIGN KEY `examSubject_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `schedule` DROP FOREIGN KEY `schedule_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `sectionSubject` DROP FOREIGN KEY `sectionSubject_sectionId_fkey`;

-- DropForeignKey
ALTER TABLE `sectionSubject` DROP FOREIGN KEY `sectionSubject_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `sectionSubject` DROP FOREIGN KEY `sectionSubject_teacherId_fkey`;

-- AlterTable
ALTER TABLE `schedule` DROP COLUMN `courseId`,
    ADD COLUMN `subjectId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `sectionSubject`;

-- CreateTable
CREATE TABLE `enrolledSubject` (
    `id` VARCHAR(191) NOT NULL,
    `subjectId` VARCHAR(191) NOT NULL,
    `studentId` INTEGER NOT NULL,

    UNIQUE INDEX `enrolledSubject_subjectId_key`(`subjectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `enrolledSubject` ADD CONSTRAINT `enrolledSubject_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrolledSubject` ADD CONSTRAINT `enrolledSubject_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examSubject` ADD CONSTRAINT `examSubject_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `enrolledSubject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `subject`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
