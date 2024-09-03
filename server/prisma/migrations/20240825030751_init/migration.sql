/*
  Warnings:

  - Added the required column `abbreviation` to the `timeslot` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_timeslot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayName" TEXT NOT NULL,
    "starTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    CONSTRAINT "timeslot_dayName_fkey" FOREIGN KEY ("dayName") REFERENCES "day" ("dayName") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_timeslot" ("dayName", "endTime", "id", "starTime") SELECT "dayName", "endTime", "id", "starTime" FROM "timeslot";
DROP TABLE "timeslot";
ALTER TABLE "new_timeslot" RENAME TO "timeslot";
CREATE UNIQUE INDEX "timeslot_dayName_starTime_endTime_key" ON "timeslot"("dayName", "starTime", "endTime");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
