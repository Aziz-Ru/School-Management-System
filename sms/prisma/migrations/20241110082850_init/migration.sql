/*
  Warnings:

  - A unique constraint covering the columns `[type,sectionId]` on the table `exam` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `exam_type_sectionId_key` ON `exam`(`type`, `sectionId`);
