/*
  Warnings:

  - A unique constraint covering the columns `[deptName]` on the table `department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[facultyName]` on the table `faculty` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "department_deptName_key" ON "department"("deptName");

-- CreateIndex
CREATE UNIQUE INDEX "faculty_facultyName_key" ON "faculty"("facultyName");
