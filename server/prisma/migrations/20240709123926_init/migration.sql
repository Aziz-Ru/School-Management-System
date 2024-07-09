/*
  Warnings:

  - You are about to drop the column `maximumCourses` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `maximumStudents` on the `classes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `classes` DROP COLUMN `maximumCourses`,
    DROP COLUMN `maximumStudents`,
    ADD COLUMN `maxCourses` INTEGER NOT NULL DEFAULT 10,
    ADD COLUMN `maxStudents` INTEGER NOT NULL DEFAULT 100;
