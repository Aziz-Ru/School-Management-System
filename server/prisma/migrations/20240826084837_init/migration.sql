/*
  Warnings:

  - You are about to drop the column `abbreviation` on the `timeslot` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `timeslot` table. All the data in the column will be lost.
  - You are about to drop the column `starTime` on the `timeslot` table. All the data in the column will be lost.
  - Added the required column `periodString` to the `timeslot` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "hour" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "period" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_timeslot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayName" TEXT NOT NULL,
    "periodString" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    CONSTRAINT "timeslot_dayName_fkey" FOREIGN KEY ("dayName") REFERENCES "day" ("dayName") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "timeslot_periodString_fkey" FOREIGN KEY ("periodString") REFERENCES "hour" ("period") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "timeslot_courseName_fkey" FOREIGN KEY ("courseName") REFERENCES "course" ("courseName") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_timeslot" ("courseName", "dayName", "id") SELECT "courseName", "dayName", "id" FROM "timeslot";
DROP TABLE "timeslot";
ALTER TABLE "new_timeslot" RENAME TO "timeslot";
CREATE UNIQUE INDEX "timeslot_dayName_courseName_key" ON "timeslot"("dayName", "courseName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "hour_period_key" ON "hour"("period");
