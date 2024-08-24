import prisma from "../prisma/db.js";

export const generateStudentRoll = async (classId) => {
  const year = new Date().getFullYear() % 100;
  console.log(year);
  const cnt=await prisma.student.count({where:{}})
};

generateStudentRoll();
