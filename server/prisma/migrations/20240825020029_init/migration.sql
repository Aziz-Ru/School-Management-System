/*
  Warnings:

  - A unique constraint covering the columns `[courseName]` on the table `course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "day" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "timeslot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "starTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "routine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sectionName" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    CONSTRAINT "routine_sectionName_fkey" FOREIGN KEY ("sectionName") REFERENCES "section" ("sectionName") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "routine_courseName_fkey" FOREIGN KEY ("courseName") REFERENCES "course" ("courseName") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_dayTotimeslot" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_dayTotimeslot_A_fkey" FOREIGN KEY ("A") REFERENCES "day" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_dayTotimeslot_B_fkey" FOREIGN KEY ("B") REFERENCES "timeslot" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_dayToroutine" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_dayToroutine_A_fkey" FOREIGN KEY ("A") REFERENCES "day" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_dayToroutine_B_fkey" FOREIGN KEY ("B") REFERENCES "routine" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "day_dayName_key" ON "day"("dayName");

-- CreateIndex
CREATE UNIQUE INDEX "_dayTotimeslot_AB_unique" ON "_dayTotimeslot"("A", "B");

-- CreateIndex
CREATE INDEX "_dayTotimeslot_B_index" ON "_dayTotimeslot"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_dayToroutine_AB_unique" ON "_dayToroutine"("A", "B");

-- CreateIndex
CREATE INDEX "_dayToroutine_B_index" ON "_dayToroutine"("B");

-- CreateIndex
CREATE UNIQUE INDEX "course_courseName_key" ON "course"("courseName");
