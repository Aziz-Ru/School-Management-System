/*
  Warnings:

  - A unique constraint covering the columns `[sectionName,classId,year]` on the table `section` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `routine` DROP FOREIGN KEY `routine_sectionName_fkey`;

-- DropIndex
DROP INDEX `section_sectionName_key` ON `section`;

-- CreateIndex
CREATE UNIQUE INDEX `section_sectionName_classId_year_key` ON `section`(`sectionName`, `classId`, `year`);

-- AddForeignKey
ALTER TABLE `routine` ADD CONSTRAINT `routine_sectionName_fkey` FOREIGN KEY (`sectionName`) REFERENCES `section`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
