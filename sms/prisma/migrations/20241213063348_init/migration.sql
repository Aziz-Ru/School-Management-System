-- CreateTable
CREATE TABLE `Room` (
    `id` VARCHAR(191) NOT NULL,
    `roomNumber` INTEGER NOT NULL,
    `floor` INTEGER NOT NULL,
    `building` VARCHAR(191) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `type` ENUM('CLASSROOM', 'LABORATORY', 'LIBRARY', 'COMPUTER_LAB', 'MUSIC_ROOM', 'ART_ROOM', 'GYMNASIUM', 'AUDITORIUM') NOT NULL DEFAULT 'CLASSROOM',
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Room_roomNumber_floor_building_key`(`roomNumber`, `floor`, `building`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subject` (
    `subject_name` VARCHAR(191) NOT NULL,
    `subject_code` INTEGER NOT NULL,

    UNIQUE INDEX `subject_subject_name_key`(`subject_name`),
    PRIMARY KEY (`subject_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classes` (
    `class_id` INTEGER NOT NULL,
    `class_name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `level` ENUM('PRIMARY', 'SECONDARY') NOT NULL,

    UNIQUE INDEX `classes_class_id_key`(`class_id`),
    PRIMARY KEY (`class_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `class_subject` (
    `subject_name` VARCHAR(191) NOT NULL,
    `class_id` INTEGER NOT NULL,
    `description` TEXT NOT NULL,

    UNIQUE INDEX `class_subject_subject_name_class_id_key`(`subject_name`, `class_id`),
    PRIMARY KEY (`subject_name`, `class_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sections` (
    `section_id` VARCHAR(191) NOT NULL,
    `section_name` VARCHAR(191) NOT NULL,
    `class_id` INTEGER NOT NULL,
    `academic_year` INTEGER NOT NULL,
    `room_number` INTEGER NOT NULL,
    `class_teacher` INTEGER NOT NULL,
    `index` INTEGER NOT NULL DEFAULT 0,
    `maximum_student` INTEGER NOT NULL DEFAULT 50,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `sections_section_name_class_id_academic_year_key`(`section_name`, `class_id`, `academic_year`),
    UNIQUE INDEX `sections_room_number_academic_year_key`(`room_number`, `academic_year`),
    UNIQUE INDEX `sections_class_teacher_academic_year_key`(`class_teacher`, `academic_year`),
    PRIMARY KEY (`section_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `section_subject` (
    `class_id` INTEGER NOT NULL,
    `subject_name` VARCHAR(191) NOT NULL,
    `section_id` VARCHAR(191) NOT NULL,
    `teacher_id` INTEGER NOT NULL,

    PRIMARY KEY (`subject_name`, `section_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `section_subject_schedule` (
    `schedule_id` VARCHAR(191) NOT NULL,
    `subject_name` VARCHAR(191) NOT NULL,
    `section_id` VARCHAR(191) NOT NULL,
    `timeslot_id` VARCHAR(191) NOT NULL,
    `teacher_id` INTEGER NOT NULL,
    `academic_year` INTEGER NOT NULL DEFAULT 2024,

    UNIQUE INDEX `section_subject_schedule_subject_name_section_id_timeslot_id_key`(`subject_name`, `section_id`, `timeslot_id`, `teacher_id`),
    UNIQUE INDEX `section_subject_schedule_timeslot_id_teacher_id_academic_yea_key`(`timeslot_id`, `teacher_id`, `academic_year`),
    PRIMARY KEY (`schedule_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `timeslot` (
    `id` VARCHAR(191) NOT NULL,
    `hour` INTEGER NOT NULL,
    `day` ENUM('SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY') NOT NULL,
    `type` ENUM('REGULAR', 'LAB', 'ACTIVITY', 'BREAK', 'ASSEMBLY') NOT NULL DEFAULT 'REGULAR',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'TEACHER', 'STUDENT', 'STAFF') NOT NULL,
    `sex` ENUM('MALE', 'FEMALE') NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') NOT NULL DEFAULT 'ACTIVE',
    `img` VARCHAR(191) NULL,
    `lastLogin` DATETIME(3) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_id_key`(`id`),
    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teacher` (
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `abbreviation` VARCHAR(191) NOT NULL,
    `teacher_id` INTEGER NOT NULL,
    `subject_name` VARCHAR(191) NOT NULL,
    `degrees` ENUM('BSC', 'MSC', 'BBA') NOT NULL DEFAULT 'BBA',
    `rank` ENUM('SENIOR', 'ASSISTANT') NOT NULL,
    `level` ENUM('PRIMARY', 'SECONDARY') NOT NULL,
    `salary` INTEGER NOT NULL DEFAULT 25000,

    UNIQUE INDEX `teacher_teacher_id_key`(`teacher_id`),
    PRIMARY KEY (`teacher_id`, `subject_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student` (
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `student_id` INTEGER NOT NULL,
    `student_id_str` VARCHAR(191) NOT NULL,
    `section_id` VARCHAR(191) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `level` ENUM('PRIMARY', 'SECONDARY') NOT NULL,

    UNIQUE INDEX `student_student_id_key`(`student_id`),
    PRIMARY KEY (`student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeacherLeave` (
    `id` VARCHAR(191) NOT NULL,
    `teacher_id` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `type` ENUM('SICK_LEAVE', 'FAMILY_EMERGENCY', 'PLANNED_ABSENCE', 'SPORTS_ACTIVITY', 'ACADEMIC_ACTIVITY', 'OTHER') NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'PARTIALLY_APPROVED', 'ON_HOLD', 'IN_PROGRESS', 'COMPLETED', 'EXPIRED') NOT NULL DEFAULT 'PENDING',
    `reason` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student_attendance` (
    `id` VARCHAR(191) NOT NULL,
    `student_id` INTEGER NOT NULL,
    `sectionId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `year` INTEGER NOT NULL DEFAULT 2024,
    `month` INTEGER NOT NULL DEFAULT 11,
    `status` ENUM('PRESENT', 'ABSENT', 'LATE', 'HALF_DAY', 'EXCUSED', 'ON_LEAVE') NOT NULL,
    `timeIn` DATETIME(3) NULL,
    `timeOut` DATETIME(3) NULL,
    `lateMinutes` INTEGER NULL,
    `markedById` INTEGER NOT NULL,
    `remarks` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `student_attendance_id_key`(`id`),
    INDEX `student_attendance_date_status_idx`(`date`, `status`),
    INDEX `student_attendance_student_id_status_idx`(`student_id`, `status`),
    UNIQUE INDEX `student_attendance_student_id_date_key`(`student_id`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teacher_attendance` (
    `id` VARCHAR(191) NOT NULL,
    `teacherId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `status` ENUM('PRESENT', 'ABSENT', 'LATE', 'HALF_DAY', 'EXCUSED', 'ON_LEAVE') NOT NULL,
    `year` INTEGER NOT NULL DEFAULT 2024,
    `month` INTEGER NOT NULL DEFAULT 11,
    `timeIn` DATETIME(3) NULL,
    `timeOut` DATETIME(3) NULL,
    `lateMinutes` INTEGER NULL,
    `substitutedBy` INTEGER NULL,
    `remarks` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `teacher_attendance_date_status_idx`(`date`, `status`),
    UNIQUE INDEX `teacher_attendance_teacherId_date_key`(`teacherId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance_summery` (
    `id` VARCHAR(191) NOT NULL,
    `student_id` INTEGER NOT NULL,
    `academicYear` INTEGER NOT NULL,
    `month` INTEGER NOT NULL,
    `totalDays` INTEGER NOT NULL,
    `presentDays` INTEGER NOT NULL,
    `absentDays` INTEGER NOT NULL,
    `lateDays` INTEGER NOT NULL,
    `excusedDays` INTEGER NOT NULL,
    `leavesDays` INTEGER NOT NULL,
    `attendancePercentage` DOUBLE NOT NULL,
    `lastCalculated` DATETIME(3) NOT NULL,

    UNIQUE INDEX `attendance_summery_student_id_academicYear_month_key`(`student_id`, `academicYear`, `month`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance_policy` (
    `id` VARCHAR(191) NOT NULL,
    `academicYear` INTEGER NOT NULL,
    `requiredAttendance` DOUBLE NOT NULL,
    `lateGracePeriod` INTEGER NOT NULL,
    `autoMarkAbsentAfter` INTEGER NOT NULL,
    `countLateAsHalfDay` INTEGER NOT NULL,
    `countLateAsAbsent` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('MIDTERM', 'FINAL', 'QUIZ', 'ASSIGNMENT') NOT NULL,
    `section_id` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `publish_status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_subjects` (
    `id` VARCHAR(191) NOT NULL,
    `exam_id` VARCHAR(191) NOT NULL,
    `subject_name` VARCHAR(191) NOT NULL,
    `section_id` VARCHAR(191) NOT NULL,
    `max_mark` DOUBLE NOT NULL,
    `passing_mark` DOUBLE NOT NULL,
    `weigtage` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subject_marks` (
    `id` VARCHAR(191) NOT NULL,
    `exam_subject_id` VARCHAR(191) NOT NULL,
    `student_id` INTEGER NOT NULL,
    `obtained_marks` DOUBLE NOT NULL,
    `percentage` DOUBLE NOT NULL,
    `grade` VARCHAR(191) NOT NULL,
    `practical_marks` DOUBLE NULL,
    `theory_mark` DOUBLE NULL,
    `assignment_mark` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `subject_marks_exam_subject_id_student_id_key`(`exam_subject_id`, `student_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_result` (
    `id` VARCHAR(191) NOT NULL,
    `examId` VARCHAR(191) NOT NULL,
    `student_id` INTEGER NOT NULL,
    `totalObtainedMarks` DOUBLE NOT NULL,
    `totalMarks` DOUBLE NOT NULL,
    `gpa` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `exam_result_examId_student_id_key`(`examId`, `student_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notice` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `filePathName` VARCHAR(191) NOT NULL,
    `type` ENUM('ACADEMIC', 'EXAMINATION', 'ADMINISTRATIVE', 'EVENT') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Authority` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `type` ENUM('PRINCIPAL', 'VICE_PRINCIPAL', 'ADMINISTRATOR', 'PRESIDENT', 'DIRECTOR', 'MANAGER', 'SUPERVISOR', 'COORDINATOR') NOT NULL,
    `message` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `class_subject` ADD CONSTRAINT `class_subject_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `classes`(`class_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_subject` ADD CONSTRAINT `class_subject_subject_name_fkey` FOREIGN KEY (`subject_name`) REFERENCES `subject`(`subject_name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sections` ADD CONSTRAINT `sections_class_teacher_fkey` FOREIGN KEY (`class_teacher`) REFERENCES `teacher`(`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sections` ADD CONSTRAINT `sections_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `classes`(`class_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `section_subject` ADD CONSTRAINT `section_subject_subject_name_class_id_fkey` FOREIGN KEY (`subject_name`, `class_id`) REFERENCES `class_subject`(`subject_name`, `class_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `section_subject` ADD CONSTRAINT `section_subject_section_id_fkey` FOREIGN KEY (`section_id`) REFERENCES `sections`(`section_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `section_subject` ADD CONSTRAINT `section_subject_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teacher`(`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `section_subject_schedule` ADD CONSTRAINT `section_subject_schedule_subject_name_section_id_fkey` FOREIGN KEY (`subject_name`, `section_id`) REFERENCES `section_subject`(`subject_name`, `section_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `section_subject_schedule` ADD CONSTRAINT `section_subject_schedule_timeslot_id_fkey` FOREIGN KEY (`timeslot_id`) REFERENCES `timeslot`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `section_subject_schedule` ADD CONSTRAINT `section_subject_schedule_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teacher`(`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teacher` ADD CONSTRAINT `teacher_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teacher` ADD CONSTRAINT `teacher_subject_name_fkey` FOREIGN KEY (`subject_name`) REFERENCES `subject`(`subject_name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_section_id_fkey` FOREIGN KEY (`section_id`) REFERENCES `sections`(`section_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeacherLeave` ADD CONSTRAINT `TeacherLeave_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teacher`(`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_attendance` ADD CONSTRAINT `student_attendance_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_attendance` ADD CONSTRAINT `student_attendance_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `sections`(`section_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_attendance` ADD CONSTRAINT `student_attendance_markedById_fkey` FOREIGN KEY (`markedById`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teacher_attendance` ADD CONSTRAINT `teacher_attendance_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `teacher`(`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance_summery` ADD CONSTRAINT `attendance_summery_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam` ADD CONSTRAINT `exam_section_id_fkey` FOREIGN KEY (`section_id`) REFERENCES `sections`(`section_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_subjects` ADD CONSTRAINT `exam_subjects_exam_id_fkey` FOREIGN KEY (`exam_id`) REFERENCES `exam`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_subjects` ADD CONSTRAINT `exam_subjects_subject_name_section_id_fkey` FOREIGN KEY (`subject_name`, `section_id`) REFERENCES `section_subject`(`subject_name`, `section_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subject_marks` ADD CONSTRAINT `subject_marks_exam_subject_id_fkey` FOREIGN KEY (`exam_subject_id`) REFERENCES `exam_subjects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subject_marks` ADD CONSTRAINT `subject_marks_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_result` ADD CONSTRAINT `exam_result_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `exam`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_result` ADD CONSTRAINT `exam_result_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;
