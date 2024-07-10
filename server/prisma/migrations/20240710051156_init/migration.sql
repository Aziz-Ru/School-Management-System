/*
  Warnings:

  - A unique constraint covering the columns `[year,uId,classId]` on the table `EnrollClass` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `EnrollClass_year_uId_key` ON `EnrollClass`;

-- CreateIndex
CREATE UNIQUE INDEX `EnrollClass_year_uId_classId_key` ON `EnrollClass`(`year`, `uId`, `classId`);
