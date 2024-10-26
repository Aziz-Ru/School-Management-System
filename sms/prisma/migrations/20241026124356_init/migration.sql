/*
  Warnings:

  - Added the required column `month` to the `attendence` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `attendence` ADD COLUMN `month` ENUM('JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER') NOT NULL;

-- AlterTable
ALTER TABLE `student` MODIFY `phone` VARCHAR(191) NOT NULL;
