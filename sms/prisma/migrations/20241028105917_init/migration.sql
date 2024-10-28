/*
  Warnings:

  - You are about to alter the column `studentId` on the `result` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `student` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `result` DROP FOREIGN KEY `result_studentId_fkey`;

-- AlterTable
ALTER TABLE `result` MODIFY `studentId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `student` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `result` ADD CONSTRAINT `result_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
