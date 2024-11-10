"use server";

import prisma from "@/lib/db";
import { Attendence, Schedule, Status, Teacher } from "./types";

type TeacherResponseProps = {
  teacher?: Teacher;
  schedule?: Schedule[];
  attendence?: Attendence[];
  status: Status;
};

export const getTeacherProfile = async (
  uid: number
): Promise<TeacherResponseProps> => {
  const date = new Date();

  try {
    const [teacher, schedule, attendence] = await prisma.$transaction([
      prisma.teacher.findUnique({
        where: {
          id: uid,
        },
        select: {
          id: true,
          fullName: true,
          phone: true,
          img: true,
          email: true,
        },
      }),

      prisma.schedule.findMany({
        where: {
          teacherId: uid,
        },
        select: {
          id: true,
          startEnd: true,
          subject: {
            select: {
              courseName: true,
            },
          },
          section: {
            select: {
              sectionName: true,
              classId: true,
            },
          },
          day: true,
        },
      }),
      prisma.teacherAttendence.findMany({
        where: { teacherId: uid, year: date.getFullYear() },
      }),
    ]);
    if (!teacher) {
      return { status: Status.NOT_FOUND };
    }
    return { teacher, schedule, attendence, status: Status.OK };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};

export const getStudentProile = async (uid: number, sectionId: string) => {
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
