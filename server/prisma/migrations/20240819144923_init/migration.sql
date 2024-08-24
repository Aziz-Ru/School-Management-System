/*
  Warnings:

  - Added the required column `deptId` to the `employee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "faculty" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "facultyName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "department" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deptName" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,
    CONSTRAINT "department_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculty" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "employeeId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "message" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "joinDate" TEXT NOT NULL,
    "imageURL" TEXT,
    "deptId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "employee_deptId_fkey" FOREIGN KEY ("deptId") REFERENCES "department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_employee" ("createdAt", "email", "employeeId", "firstName", "id", "imageURL", "joinDate", "lastName", "message", "password", "phone", "rank", "sex") SELECT "createdAt", "email", "employeeId", "firstName", "id", "imageURL", "joinDate", "lastName", "message", "password", "phone", "rank", "sex" FROM "employee";
DROP TABLE "employee";
ALTER TABLE "new_employee" RENAME TO "employee";
CREATE UNIQUE INDEX "employee_employeeId_key" ON "employee"("employeeId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
