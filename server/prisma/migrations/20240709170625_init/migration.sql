/*
  Warnings:

  - You are about to drop the `OfficerProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `OfficerProfile` DROP FOREIGN KEY `OfficerProfile_uId_fkey`;

-- DropForeignKey
ALTER TABLE `StudentProfile` DROP FOREIGN KEY `StudentProfile_uId_fkey`;

-- DropTable
DROP TABLE `OfficerProfile`;

-- DropTable
DROP TABLE `StudentProfile`;
