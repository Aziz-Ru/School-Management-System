/*
  Warnings:

  - You are about to alter the column `rank` on the `Teacher` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `Teacher` MODIFY `rank` ENUM('SENIOR', 'ASSISTANT') NOT NULL DEFAULT 'ASSISTANT';
