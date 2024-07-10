-- CreateTable
CREATE TABLE `School` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `totalTeachers` INTEGER NOT NULL DEFAULT 30,
    `address` LONGTEXT NOT NULL,
    `establishAt` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `School_id_key`(`id`),
    UNIQUE INDEX `School_email_key`(`email`),
    UNIQUE INDEX `School_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `uId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `admissionYear` INTEGER NULL,
    `role` ENUM('Admin', 'Teacher', 'Student') NOT NULL DEFAULT 'Student',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_uId_key`(`uId`),
    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_uId_name_key`(`uId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` VARCHAR(191) NOT NULL,
    `uId` VARCHAR(191) NOT NULL,
    `dob` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `sex` VARCHAR(191) NOT NULL,
    `imageLink` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Profile_uId_key`(`uId`),
    UNIQUE INDEX `Profile_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OfficerProfile` (
    `id` VARCHAR(191) NOT NULL,
    `uId` VARCHAR(191) NOT NULL,
    `qualification` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NOT NULL,
    `rank` ENUM('PRINCIPAL', 'VICE_PRINCIPAL', 'TEACHER', 'STAFF') NOT NULL DEFAULT 'TEACHER',
    `salary` DOUBLE NOT NULL DEFAULT 20000.0,

    UNIQUE INDEX `OfficerProfile_uId_key`(`uId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentProfile` (
    `id` VARCHAR(191) NOT NULL,
    `uId` VARCHAR(191) NOT NULL,
    `class` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `StudentProfile_uId_key`(`uId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classes` (
    `classId` VARCHAR(191) NOT NULL,
    `monthlyFee` DOUBLE NOT NULL DEFAULT 1000.0,
    `totalStudents` INTEGER NOT NULL,
    `totalCourses` INTEGER NOT NULL,
    `maxStudents` INTEGER NOT NULL DEFAULT 100,
    `maxCourses` INTEGER NOT NULL DEFAULT 10,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`classId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Courses` (
    `id` VARCHAR(191) NOT NULL,
    `courseCode` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `credit` INTEGER NOT NULL DEFAULT 3,
    `totalMarks` INTEGER NOT NULL DEFAULT 100,
    `classId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Courses_courseCode_key`(`courseCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnrollClass` (
    `id` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `uId` VARCHAR(191) NOT NULL,
    `classId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `EnrollClass_uId_key`(`uId`),
    UNIQUE INDEX `EnrollClass_year_uId_key`(`year`, `uId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnrollCourse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `uId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `EnrollCourse_uId_year_key`(`uId`, `year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exam` (
    `id` VARCHAR(191) NOT NULL,
    `courseId` INTEGER NOT NULL,
    `type` ENUM('MidTerm', 'Final', 'Assignment') NOT NULL DEFAULT 'Final',
    `year` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Exam_year_courseId_type_key`(`year`, `courseId`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Result` (
    `id` VARCHAR(191) NOT NULL,
    `courseId` INTEGER NOT NULL,
    `uId` VARCHAR(191) NOT NULL,
    `examId` VARCHAR(191) NOT NULL,
    `marks` DOUBLE NOT NULL DEFAULT 33.0,
    `grade` VARCHAR(191) NULL DEFAULT 'A+',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Result_uId_courseId_examId_key`(`uId`, `courseId`, `examId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendence` (
    `id` VARCHAR(191) NOT NULL,
    `uId` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `date` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Issues` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `details` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_uId_fkey` FOREIGN KEY (`uId`) REFERENCES `users`(`uId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OfficerProfile` ADD CONSTRAINT `OfficerProfile_uId_fkey` FOREIGN KEY (`uId`) REFERENCES `Profile`(`uId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentProfile` ADD CONSTRAINT `StudentProfile_uId_fkey` FOREIGN KEY (`uId`) REFERENCES `Profile`(`uId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `classes`(`classId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnrollClass` ADD CONSTRAINT `EnrollClass_uId_fkey` FOREIGN KEY (`uId`) REFERENCES `users`(`uId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnrollClass` ADD CONSTRAINT `EnrollClass_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `classes`(`classId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnrollCourse` ADD CONSTRAINT `EnrollCourse_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`courseCode`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnrollCourse` ADD CONSTRAINT `EnrollCourse_uId_fkey` FOREIGN KEY (`uId`) REFERENCES `users`(`uId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam` ADD CONSTRAINT `Exam_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `EnrollCourse`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `Exam`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `EnrollCourse`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_uId_fkey` FOREIGN KEY (`uId`) REFERENCES `users`(`uId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendence` ADD CONSTRAINT `Attendence_uId_fkey` FOREIGN KEY (`uId`) REFERENCES `users`(`uId`) ON DELETE CASCADE ON UPDATE CASCADE;
