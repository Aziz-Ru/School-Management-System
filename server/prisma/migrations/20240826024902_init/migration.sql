/*
  Warnings:

  - You are about to drop the column `courseName` on the `routine` table. All the data in the column will be lost.
  - Added the required column `courseName` to the `timeslot` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_routine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sectionName" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    CONSTRAINT "routine_sectionName_fkey" FOREIGN KEY ("sectionName") REFERENCES "section" ("sectionName") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_routine" ("id", "sectionName", "year") SELECT "id", "sectionName", "year" FROM "routine";
DROP TABLE "routine";
ALTER TABLE "new_routine" RENAME TO "routine";
CREATE TABLE "new_timeslot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayName" TEXT NOT NULL,
    "starTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    CONSTRAINT "timeslot_dayName_fkey" FOREIGN KEY ("dayName") REFERENCES "day" ("dayName") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "timeslot_courseName_fkey" FOREIGN KEY ("courseName") REFERENCES "course" ("courseName") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_timeslot" ("abbreviation", "dayName", "endTime", "id", "starTime") SELECT "abbreviation", "dayName", "endTime", "id", "starTime" FROM "timeslot";
DROP TABLE "timeslot";
ALTER TABLE "new_timeslot" RENAME TO "timeslot";
CREATE UNIQUE INDEX "timeslot_dayName_starTime_endTime_courseName_key" ON "timeslot"("dayName", "starTime", "endTime", "courseName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
