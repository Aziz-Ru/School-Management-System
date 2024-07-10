/*
  Warnings:

  - A unique constraint covering the columns `[year,courseId,classId,type]` on the table `Exam` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Exam_year_courseId_type_key` ON `Exam`;

-- CreateIndex
CREATE UNIQUE INDEX `Exam_year_courseId_classId_type_key` ON `Exam`(`year`, `courseId`, `classId`, `type`);
