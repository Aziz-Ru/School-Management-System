/*
  Warnings:

  - You are about to drop the column `examId` on the `Exam` table. All the data in the column will be lost.
  - The values [Quiz] on the enum `Exam_type` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[year,courseId,type]` on the table `Exam` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `year` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Result` DROP FOREIGN KEY `Result_examId_fkey`;

-- DropIndex
DROP INDEX `Exam_examId_key` ON `Exam`;

-- AlterTable
ALTER TABLE `Exam` DROP COLUMN `examId`,
    ADD COLUMN `year` VARCHAR(191) NOT NULL,
    MODIFY `type` ENUM('MidTerm', 'Final', 'Assignment') NOT NULL DEFAULT 'Final';

-- CreateIndex
CREATE UNIQUE INDEX `Exam_year_courseId_type_key` ON `Exam`(`year`, `courseId`, `type`);

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `Exam`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
