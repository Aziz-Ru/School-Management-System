/*
  Warnings:

  - The primary key for the `attendence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `day` on the `attendence` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `attendence` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `attendence` DROP PRIMARY KEY,
    DROP COLUMN `day`,
    DROP COLUMN `month`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `attendence` ADD CONSTRAINT `attendence_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
