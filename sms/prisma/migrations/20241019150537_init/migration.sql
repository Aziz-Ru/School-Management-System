/*
  Warnings:

  - You are about to drop the column `deptId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `supervisorId` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `deptId` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `super` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Faculty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_deptId_fkey`;

-- DropForeignKey
ALTER TABLE `Department` DROP FOREIGN KEY `Department_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `Section` DROP FOREIGN KEY `Section_supervisorId_fkey`;

-- DropForeignKey
ALTER TABLE `Teacher` DROP FOREIGN KEY `Teacher_deptId_fkey`;

-- AlterTable
ALTER TABLE `Course` DROP COLUMN `deptId`;

-- AlterTable
ALTER TABLE `Section` DROP COLUMN `supervisorId`,
    ADD COLUMN `sectionSuper` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Teacher` DROP COLUMN `deptId`,
    DROP COLUMN `super`,
    ADD COLUMN `sectionSuper` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Department`;

-- DropTable
DROP TABLE `Faculty`;

-- DropTable
DROP TABLE `events`;

-- CreateTable
CREATE TABLE `_CourseToTeacher` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CourseToTeacher_AB_unique`(`A`, `B`),
    INDEX `_CourseToTeacher_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_sectionSuper_fkey` FOREIGN KEY (`sectionSuper`) REFERENCES `Teacher`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CourseToTeacher` ADD CONSTRAINT `_CourseToTeacher_A_fkey` FOREIGN KEY (`A`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CourseToTeacher` ADD CONSTRAINT `_CourseToTeacher_B_fkey` FOREIGN KEY (`B`) REFERENCES `Teacher`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
