/*
  Warnings:

  - You are about to alter the column `year` on the `Section` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Section` MODIFY `year` INTEGER NOT NULL;
