/*
  Warnings:

  - A unique constraint covering the columns `[dayName,starTime,endTime]` on the table `timeslot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "timeslot_dayName_starTime_endTime_key" ON "timeslot"("dayName", "starTime", "endTime");
