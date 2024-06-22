/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `School_name_key` ON `School`;

-- AlterTable
ALTER TABLE `School` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `School_email_key` ON `School`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `School_phone_key` ON `School`(`phone`);
