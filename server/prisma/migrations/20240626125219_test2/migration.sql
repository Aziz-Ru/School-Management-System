-- DropForeignKey
ALTER TABLE `EnrollClasses` DROP FOREIGN KEY `EnrollClasses_classRoomId_fkey`;

-- AddForeignKey
ALTER TABLE `EnrollClasses` ADD CONSTRAINT `EnrollClasses_classRoomId_fkey` FOREIGN KEY (`classRoomId`) REFERENCES `Classes`(`classId`) ON DELETE CASCADE ON UPDATE CASCADE;
