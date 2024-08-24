/*
  Warnings:

  - Added the required column `year` to the `section` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_section" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sectionName" TEXT NOT NULL,
    "year" INTEGER NOT NULL
);
INSERT INTO "new_section" ("id", "sectionName") SELECT "id", "sectionName" FROM "section";
DROP TABLE "section";
ALTER TABLE "new_section" RENAME TO "section";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
