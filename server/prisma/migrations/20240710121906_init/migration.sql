/*
  Warnings:

  - Added the required column `classId` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Exam` ADD COLUMN `classId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Exam` ADD CONSTRAINT `Exam_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `classes`(`classId`) ON DELETE CASCADE ON UPDATE CASCADE;
