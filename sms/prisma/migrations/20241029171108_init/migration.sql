-- DropForeignKey
ALTER TABLE `sectionSubject` DROP FOREIGN KEY `sectionSubject_teacherId_fkey`;

-- AlterTable
ALTER TABLE `sectionSubject` MODIFY `teacherId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `sectionSubject` ADD CONSTRAINT `sectionSubject_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `teacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
