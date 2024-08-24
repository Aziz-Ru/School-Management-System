/*
  Warnings:

  - You are about to alter the column `classId` on the `course` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "courseName" TEXT NOT NULL,
    "totalMarks" INTEGER NOT NULL DEFAULT 100,
    "classId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "course_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classRoom" ("classId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_course" ("classId", "courseName", "createdAt", "id", "totalMarks") SELECT "classId", "courseName", "createdAt", "id", "totalMarks" FROM "course";
DROP TABLE "course";
ALTER TABLE "new_course" RENAME TO "course";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
