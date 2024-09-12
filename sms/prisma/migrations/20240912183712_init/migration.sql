-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `employee_deptId_fkey`;

-- DropForeignKey
ALTER TABLE `routine` DROP FOREIGN KEY `routine_sectionName_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `student_sectionId_fkey`;

-- DropForeignKey
ALTER TABLE `timeslot` DROP FOREIGN KEY `timeslot_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `timeslot` DROP FOREIGN KEY `timeslot_routineId_fkey`;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_deptId_fkey` FOREIGN KEY (`deptId`) REFERENCES `department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `section`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `timeslot` ADD CONSTRAINT `timeslot_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `timeslot` ADD CONSTRAINT `timeslot_routineId_fkey` FOREIGN KEY (`routineId`) REFERENCES `routine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `routine` ADD CONSTRAINT `routine_sectionName_fkey` FOREIGN KEY (`sectionName`) REFERENCES `section`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
