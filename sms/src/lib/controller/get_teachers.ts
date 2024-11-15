"use server";

import {
  FilterOptions,
  SectionSubjectSchedule,
  TeacherAttendance,
} from "@/lib/types";
import prisma from "../db";
import { Status, Subject, User, UserRole } from "../types";

type GetTeachersReturnProps = {
  teachers?: User[];
  subjects?: Subject[];
  status: Status;
};

export const get_teachers = async (
  filters: FilterOptions
): Promise<GetTeachersReturnProps> => {
  try {
    const {
      q = "",
      subject,
      level,
      status,
      sortBy = "teacherProfile.last_name",
      sortOrder = "asc",
      page = 1,
      limit = 10,
    } = filters;
    const where = {
      role: UserRole.TEACHER,
      AND: [] as any[],
    };

    if (q) {
      where.AND.push({
        OR: [
          {
            teacherProfile: {
              OR: [
                { first_name: { contains: q } },
                { last_name: { contains: q } },
              ],
            },
          },
          {
            email: { contains: q },
          },
        ],
      });
    }

    const [teachers, subjects] = await prisma.$transaction([
      prisma.user.findMany({
        where: where,

        select: {
          id: true,
          email: true,
          sex: true,
          status: true,
          lastLogin: true,
          phone: true,
          role: true,
          address: true,

          teacherProfile: {
            select: {
              first_name: true,
              last_name: true,
              teacher_id: true,
              degrees: true,
              level: true,
              subject_name: true,
            },
          },
        },
      }),
      prisma.subject.findMany(),
    ]);

    return { teachers, subjects, status: Status.OK };
  } catch (error) {
    console.log(error);
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};

type GetTeacherInfoReturnProps = {
  teacher?: User;
  schedules?: SectionSubjectSchedule[];
  attendance?: TeacherAttendance[];
  status: Status;
};

export const get_teacher_info = async (
  uid: number
): Promise<GetTeacherInfoReturnProps> => {
  const date = new Date();

  try {
    const [teacher, schedules, attendance] = await prisma.$transaction([
      prisma.user.findUnique({
        where: {
          id: uid,
        },
        select: {
          id: true,
          email: true,
          sex: true,
          phone: true,
          role: true,
          address: true,
          img: true,
          teacherProfile: {
            select: {
              first_name: true,
              last_name: true,
              teacher_id: true,
              degrees: true,
              level: true,
              subject_name: true,
              rank: true,
              salary: true,
              class_teacher: {
                select: {
                  section_name: true,
                  section_id: true,
                  class_id: true,
                  room_number: true,
                  academic_year: true,
                },
              },
              enrolled_subjects: {
                select: {
                  subject_name: true,
                  section_id: true,
                  class_id: true,
                },
              },
            },
          },
        },
      }),
      prisma.section_subject_schedule.findMany({
        where: {
          teacher_id: uid,
          academic_year: date.getFullYear(),
        },
        include: {
          subject: {
            select: {
              class_id: true,
              section_id: true,
              teacher_id: true,
              subject_name: true,
              section: true,
            },
          },
          timeslot: {
            select: {
              hour: true,
              day: true,
              id: true,
            },
          },
        },
      }),
      prisma.teacher_attendance.findMany({
        where: {
          teacherId: uid,
          date: {
            gte: new Date(date.getFullYear(), 0, 1).toISOString(),
            lte: new Date(date.getFullYear(), 11, 31).toISOString(),
          },
        },
        select: {
          id: true,
          teacherId: true,
          status: true,
          date: true,
        },
      }),
    ]);

    if (!teacher) {
      return { status: Status.NOT_FOUND };
    }
    return { teacher, schedules, attendance, status: Status.OK };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};

type GetTeacherAttendanceReturnProps = {
  attendance?: TeacherAttendance[];
  status: Status;
};

export const get_teacher_attendance = async () => {
  const date = new Date();
  try {
    const attendance = await prisma.teacher.findMany({
      where: {
        attendance: {
          some: {
            date: {
              gte: new Date(date.getFullYear(), 0, 1).toISOString(),
              lte: new Date(date.getFullYear(), 11, 31).toISOString(),
            },
          },
        },
      },
      select: {
        teacher_id: true,
        first_name: true,
        last_name: true,
        attendance: {
          select: {
            id: true,
            status: true,
            date: true,
          },
        },
      },
    });

    return { attendance, status: Status.OK };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};
