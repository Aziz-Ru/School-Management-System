/*
  Warnings:

  - You are about to drop the column `enrolledclassroomId` on the `Classroom` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Classroom_enrolledclassroomId_key` ON `Classroom`;

-- AlterTable
ALTER TABLE `Classroom` DROP COLUMN `enrolledclassroomId`;
