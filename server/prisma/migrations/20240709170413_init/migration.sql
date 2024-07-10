/*
  Warnings:

  - Made the column `admissionYear` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `admissionYear` VARCHAR(191) NOT NULL;
