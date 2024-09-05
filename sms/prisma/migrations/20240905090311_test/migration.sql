-- CreateTable
CREATE TABLE `admin` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `admin_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classRoom` (
    `id` VARCHAR(191) NOT NULL,
    `classId` INTEGER NOT NULL,
    `className` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `classRoom_classId_key`(`classId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course` (
    `id` VARCHAR(191) NOT NULL,
    `courseName` VARCHAR(191) NOT NULL,
    `totalMarks` INTEGER NOT NULL DEFAULT 100,
    `classId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `course_courseName_key`(`courseName`),
    INDEX `course_classId_fkey`(`classId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `department` (
    `id` VARCHAR(191) NOT NULL,
    `deptName` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `department_deptName_key`(`deptName`),
    INDEX `department_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `rank` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `sex` VARCHAR(191) NOT NULL,
    `joinDate` VARCHAR(191) NOT NULL,
    `imageURL` VARCHAR(191) NULL,
    `deptId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `employee_employeeId_key`(`employeeId`),
    INDEX `employee_deptId_fkey`(`deptId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faculty` (
    `id` VARCHAR(191) NOT NULL,
    `facultyName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `faculty_facultyName_key`(`facultyName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `holder` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,
    `rank` VARCHAR(191) NOT NULL,
    `imageURL` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hour` (
    `id` VARCHAR(191) NOT NULL,
    `period` VARCHAR(191) NOT NULL,
    `abbreviation` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `hour_period_key`(`period`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `day` (
    `id` VARCHAR(191) NOT NULL,
    `dayName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `day_dayName_key`(`dayName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notice` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `routine` (
    `id` VARCHAR(191) NOT NULL,
    `sectionName` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,

    INDEX `routine_sectionName_fkey`(`sectionName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `school` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,
    `schoolCode` VARCHAR(191) NOT NULL,
    `EIIN` VARCHAR(191) NOT NULL,
    `imageURL` VARCHAR(191) NULL,

    UNIQUE INDEX `school_email_key`(`email`),
    UNIQUE INDEX `school_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `section` (
    `id` VARCHAR(191) NOT NULL,
    `sectionName` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `classId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `section_sectionName_classId_year_key`(`sectionName`, `classId`, `year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student` (
    `id` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `sex` VARCHAR(191) NOT NULL,
    `dob` VARCHAR(191) NOT NULL,
    `imageURL` VARCHAR(191) NULL,
    `sectionId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `student_studentId_key`(`studentId`),
    INDEX `student_sectionId_fkey`(`sectionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `timeslot` (
    `id` VARCHAR(191) NOT NULL,
    `dayName` VARCHAR(191) NOT NULL,
    `periodString` VARCHAR(191) NOT NULL,
    `courseName` VARCHAR(191) NOT NULL,

    INDEX `timeslot_courseName_fkey`(`courseName`),
    INDEX `timeslot_periodString_fkey`(`periodString`),
    UNIQUE INDEX `timeslot_dayName_courseName_periodString_key`(`dayName`, `courseName`, `periodString`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_dayToroutine` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_dayToroutine_AB_unique`(`A`, `B`),
    INDEX `_dayToroutine_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `course` ADD CONSTRAINT `course_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `classRoom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `department` ADD CONSTRAINT `department_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `faculty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_deptId_fkey` FOREIGN KEY (`deptId`) REFERENCES `department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `routine` ADD CONSTRAINT `routine_sectionName_fkey` FOREIGN KEY (`sectionName`) REFERENCES `section`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `section` ADD CONSTRAINT `section_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `classRoom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `section`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `timeslot` ADD CONSTRAINT `timeslot_courseName_fkey` FOREIGN KEY (`courseName`) REFERENCES `course`(`courseName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `timeslot` ADD CONSTRAINT `timeslot_dayName_fkey` FOREIGN KEY (`dayName`) REFERENCES `day`(`dayName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `timeslot` ADD CONSTRAINT `timeslot_periodString_fkey` FOREIGN KEY (`periodString`) REFERENCES `hour`(`period`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_dayToroutine` ADD CONSTRAINT `_dayToroutine_A_fkey` FOREIGN KEY (`A`) REFERENCES `day`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_dayToroutine` ADD CONSTRAINT `_dayToroutine_B_fkey` FOREIGN KEY (`B`) REFERENCES `routine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
