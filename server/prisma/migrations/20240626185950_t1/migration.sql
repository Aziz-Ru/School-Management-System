/*
  Warnings:

  - A unique constraint covering the columns `[phone,email]` on the table `Students` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Students_phone_email_key` ON `Students`(`phone`, `email`);
