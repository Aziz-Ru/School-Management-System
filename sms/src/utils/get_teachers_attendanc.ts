import prisma from "@/lib/db";

export const getTeacherAttendance = async () => {
  const current = new Date();
  const teachers = await prisma.teacher.findMany({
    select: {
      id: true,
      fullName: true,
      attendence: {
        where: {
          year: current.getFullYear(),
          month: current.getMonth() + 1,
        },
        select: {
          id: true,
          present: true,
          date: true,
          year: true,
        },
      },
    },
  });

  return teachers;
};
