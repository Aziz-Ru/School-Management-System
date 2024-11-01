/*
  Warnings:

  - Made the column `subjectId` on table `schedule` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `schedule` DROP FOREIGN KEY `schedule_subjectId_fkey`;

-- AlterTable
ALTER TABLE `schedule` MODIFY `subjectId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
