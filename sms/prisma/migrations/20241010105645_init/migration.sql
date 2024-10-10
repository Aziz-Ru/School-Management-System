/*
  Warnings:

  - Made the column `address` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Student` MODIFY `address` VARCHAR(191) NOT NULL;
