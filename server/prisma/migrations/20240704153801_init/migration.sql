-- DropForeignKey
ALTER TABLE `Attendence` DROP FOREIGN KEY `Attendence_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Courses` DROP FOREIGN KEY `Courses_classId_fkey`;

-- DropForeignKey
ALTER TABLE `EnrollClass` DROP FOREIGN KEY `EnrollClass_classId_fkey`;

-- DropForeignKey
ALTER TABLE `EnrollClass` DROP FOREIGN KEY `EnrollClass_userId_fkey`;

-- DropForeignKey
ALTER TABLE `EnrollCourse` DROP FOREIGN KEY `EnrollCourse_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `EnrollCourse` DROP FOREIGN KEY `EnrollCourse_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Exam` DROP FOREIGN KEY `Exam_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Result` DROP FOREIGN KEY `Result_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Result` DROP FOREIGN KEY `Result_examId_fkey`;

-- DropForeignKey
ALTER TABLE `Result` DROP FOREIGN KEY `Result_userId_fkey`;

-- DropForeignKey
ALTER TABLE `StudentProfile` DROP FOREIGN KEY `StudentProfile_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentProfile` ADD CONSTRAINT `StudentProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Profile`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `classes`(`classId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnrollClass` ADD CONSTRAINT `EnrollClass_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnrollClass` ADD CONSTRAINT `EnrollClass_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `classes`(`classId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnrollCourse` ADD CONSTRAINT `EnrollCourse_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`courseCode`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnrollCourse` ADD CONSTRAINT `EnrollCourse_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam` ADD CONSTRAINT `Exam_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `EnrollCourse`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `Exam`(`examId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `EnrollCourse`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendence` ADD CONSTRAINT `Attendence_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
