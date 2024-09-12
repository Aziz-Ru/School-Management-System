/*
  Warnings:

  - You are about to alter the column `rank` on the `employee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to drop the column `employeeId` on the `timeslot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `employee_deptId_fkey`;

-- DropForeignKey
ALTER TABLE `timeslot` DROP FOREIGN KEY `timeslot_employeeId_fkey`;

-- DropIndex
DROP INDEX `timeslot_startTime_endTime_day_courseId_employeeId_key` ON `timeslot`;

-- AlterTable
ALTER TABLE `employee` MODIFY `rank` ENUM('Vice_Principal', 'Senior_Teacher', 'Junior_Teacher', 'Assistant_Teacher', 'Office_Staff') NOT NULL DEFAULT 'Junior_Teacher',
    MODIFY `deptId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `timeslot` DROP COLUMN `employeeId`;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_deptId_fkey` FOREIGN KEY (`deptId`) REFERENCES `department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
