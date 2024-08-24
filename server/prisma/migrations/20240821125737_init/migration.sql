/*
  Warnings:

  - Added the required column `classId` to the `section` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_section" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sectionName" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "classId" INTEGER NOT NULL,
    CONSTRAINT "section_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classRoom" ("classId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_section" ("id", "sectionName", "year") SELECT "id", "sectionName", "year" FROM "section";
DROP TABLE "section";
ALTER TABLE "new_section" RENAME TO "section";
CREATE UNIQUE INDEX "section_sectionName_key" ON "section"("sectionName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
