/*
  Warnings:

  - You are about to drop the `_dayTotimeslot` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dayName` to the `timeslot` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_dayTotimeslot_B_index";

-- DropIndex
DROP INDEX "_dayTotimeslot_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_dayTotimeslot";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_timeslot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayName" TEXT NOT NULL,
    "starTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    CONSTRAINT "timeslot_dayName_fkey" FOREIGN KEY ("dayName") REFERENCES "day" ("dayName") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_timeslot" ("endTime", "id", "starTime") SELECT "endTime", "id", "starTime" FROM "timeslot";
DROP TABLE "timeslot";
ALTER TABLE "new_timeslot" RENAME TO "timeslot";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
