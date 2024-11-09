import prisma from "@/lib/db";
import { Attendence, Schedule, Status, Student } from "./types";

type StudentResponseProps = {
  student?: Student;
  schedule?: Schedule[];
  attendence?: Attendence[];
  status: Status;
};

export const getStudentData = async (
  uid: number,
  sectionId: string
): Promise<StudentResponseProps> => {
  try {
    const [student, schedule, attendence] = await prisma.$transaction([
      prisma.student.findUnique({
        where: { id: uid },
        select: {
          id: true,
          fullName: true,
          phone: true,
          img: true,
          section: {
            select: {
              sectionName: true,
              classId: true,
            },
          },
          dob: true,
        },
      }),
      prisma.schedule.findMany({
        where: {
          sectionId: sectionId,
        },
        select: {
          id: true,
          startEnd: true,

          subject: {
            select: {
              courseName: true,
            },
          },
          teacher: {
            select: {
              id: true,
              fullName: true,
            },
          },
          day: true,
        },
      }),
      prisma.attendence.findMany({
        where: {
          studentId: uid,
          year: new Date().getFullYear(),
          sectionId: sectionId,
        },
        select: {
          id: true,
          date: true,
          year: true,
          present: true,
          month: true,
        },
      }),
    ]);

    if (!student) {
      return { status: Status.NOT_FOUND };
    }

    return { student, schedule, attendence, status: Status.OK };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};
