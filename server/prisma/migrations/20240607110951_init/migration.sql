-- CreateTable
CREATE TABLE `School` (
    `SHId` VARCHAR(191) NOT NULL,
    `SHName` VARCHAR(191) NOT NULL,
    `SHAddress` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `School_SHId_key`(`SHId`),
    UNIQUE INDEX `School_SHName_key`(`SHName`),
    PRIMARY KEY (`SHId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teacher` (
    `TId` VARCHAR(191) NOT NULL,
    `TEmail` VARCHAR(191) NOT NULL,
    `TName` VARCHAR(191) NOT NULL,
    `TPassword` VARCHAR(191) NOT NULL,
    `TImageLink` VARCHAR(191) NULL,
    `TQualification` VARCHAR(191) NULL,
    `TBio` VARCHAR(191) NULL,
    `TDOB` DATETIME(3) NULL,
    `TAddress` VARCHAR(191) NULL,
    `TPhone` VARCHAR(11) NULL,
    `SchoolId` VARCHAR(191) NOT NULL,
    `Active` BOOLEAN NOT NULL,
    `JoindAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`TId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `STUId` VARCHAR(191) NOT NULL,
    `STURoll` VARCHAR(191) NOT NULL,
    `STUName` VARCHAR(191) NOT NULL,
    `STUPassword` VARCHAR(191) NOT NULL,
    `STUImageLink` VARCHAR(191) NULL,
    `STUPhone` CHAR(11) NOT NULL,
    `SchoolId` VARCHAR(191) NOT NULL,
    `class` ENUM('Class_1', 'Class_2', 'Class_3', 'Class_4', 'Class_5', 'Class_6', 'Class_7', 'Class_8', 'Class_9', 'Class_10', 'Class_11', 'Class_12') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Student_STURoll_key`(`STURoll`),
    PRIMARY KEY (`STUId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_SchoolId_fkey` FOREIGN KEY (`SchoolId`) REFERENCES `School`(`SHId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_SchoolId_fkey` FOREIGN KEY (`SchoolId`) REFERENCES `School`(`SHId`) ON DELETE RESTRICT ON UPDATE CASCADE;
