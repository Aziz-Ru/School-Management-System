"use server";

import { FilterOptions } from "@/lib/types";
import prisma from "../db";
import { Classes, Status, User, UserRole } from "../types";

type GetStudentReturnProps = {
  students?: User[];
  classes?: Classes[];
  status: Status;
};

export const get_students = async (
  filters: FilterOptions
): Promise<GetStudentReturnProps> => {
  try {
    const where = {
      role: UserRole.STUDENT,
      AND: [] as any[],
    };

    if (filters.q) {
      where.AND.push({
        OR: [
          {
            studentProfile: {
              student_id_str: {
                contains: filters.q!,
              },
            },
          },
        ],
      });
    }

    const [students, classes] = await prisma.$transaction([
      prisma.user.findMany({
        where: where,
        select: {
          id: true,
          email: true,
          lastLogin: true,
          address: true,
          img: true,
          phone: true,
          sex: true,
          studentProfile: {
            select: {
              student_id: true,
              first_name: true,
              last_name: true,
              section: {
                select: {
                  section_id: true,
                  section_name: true,
                  academic_year: true,
                  room_number: true,
                },
              },
            },
          },
        },
      }),
      prisma.classes.findMany({
        where: {
          sections: {
            some: {
              academic_year: new Date().getFullYear(),
            },
          },
        },
        select: {
          class_id: true,
          class_name: true,
          sections: {
            select: {
              section_name: true,
              section_id: true,
              academic_year: true,
              room_number: true,
              index: true,
              class_id: true,
              _count: {
                select: {
                  students: true,
                },
              },
            },
          },
        },
        orderBy: {
          class_id: "asc",
        },
      }),
    ]);

    return {
      students,
      classes,
      status: Status.OK,
    };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};

export const get_student_info = async (id: number) => {
  try {
    const [student, attendance, notices] = await prisma.$transaction([
      prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          email: true,
          lastLogin: true,
          address: true,
          img: true,
          phone: true,
          sex: true,
          studentProfile: {
            select: {
              student_id: true,
              first_name: true,
              last_name: true,
              section: {
                select: {
                  section_id: true,
                  section_name: true,
                  academic_year: true,
                  room_number: true,
                },
              },
            },
          },
        },
      }),
      prisma.student_attendance.findMany({
        where: {
          student_id: id,
          year: new Date().getFullYear(),
        },
        select: {
          id: true,
          student_id: true,
          status: true,
          date: true,
        },
      }),
      prisma.notice.findMany({
        select: {
          id: true,
          title: true,
          filePathName: true,
          type: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),
    ]);
    if (!student) {
      return { status: Status.NOT_FOUND };
    }
    const schedules = await prisma.section_subject_schedule.findMany({
      where: {
        academic_year: new Date().getFullYear(),
        section_id: student.studentProfile?.section.section_id,
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
    });
    return { student, attendance, notices, schedules, status: Status.OK };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};
