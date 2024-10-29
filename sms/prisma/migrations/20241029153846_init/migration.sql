/*
  Warnings:

  - You are about to drop the column `day` on the `lesson` table. All the data in the column will be lost.
  - You are about to alter the column `startTime` on the `lesson` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `endTime` on the `lesson` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[teacherId,startTime,endTime]` on the table `lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `lesson` DROP COLUMN `day`,
    MODIFY `startTime` INTEGER NOT NULL,
    MODIFY `endTime` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `lesson_teacherId_startTime_endTime_key` ON `lesson`(`teacherId`, `startTime`, `endTime`);
