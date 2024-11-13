"use server";

import prisma from "@/lib/db";
import { FilterOptions, StudentAttendance } from "@/lib/types";
import { Section, SectionSubject, Status, User } from "../types";

type ReturnProps = {
  section?: Section[];
  status: Status;
};

export const get_sections = async (
  filters: FilterOptions
): Promise<ReturnProps> => {
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
    AND: [] as any[],
  };
  if (q) {
    where.AND.push({
      OR: [
        {
          section_name: { contains: q },
        },
      ],
    });
  }
  try {
    const sections = await prisma.sections.findMany({
      where: where,
      select: {
        section_id: true,
        section_name: true,
        academic_year: true,
        class_id: true,
        room_number: true,
        maximum_student: true,
        teacher: {
          select: {
            first_name: true,
            last_name: true,
            teacher_id: true,
          },
        },
        _count: {
          select: {
            students: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { section: sections, status: Status.OK };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};

type SectionReturnProps = {
  section?: Section;
  students?: User[];
  status: Status;
  section_subjects?: SectionSubject[];
  attendance?: StudentAttendance[];
};

export const get_section_info = async (
  sectionId: string
): Promise<SectionReturnProps> => {
  try {
    const [section, students, attendance, section_subjects] =
      await prisma.$transaction([
        prisma.sections.findUnique({
          where: {
            section_id: sectionId,
          },
          select: {
            section_id: true,
            section_name: true,
            teacher: {
              select: {
                teacher_id: true,
                last_name: true,
                first_name: true,
              },
            },
            class_id: true,
            academic_year: true,
            room_number: true,
          },
        }),
        prisma.user.findMany({
          where: {
            role: "STUDENT",
            studentProfile: {
              section_id: sectionId,
            },
          },
          select: {
            id: true,
            email: true,
            sex: true,
            status: true,
            img: true,
            lastLogin: true,
            studentProfile: {
              select: {
                student_id: true,
                first_name: true,
                last_name: true,
              },
            },
          },
        }),
        prisma.student_attendance.findMany({
          where: {
            sectionId: sectionId,
          },
          select: {
            id: true,
            student_id: true,
            sectionId: true,
            date: true,
            status: true,
          },
        }),
        prisma.section_subject.findMany({
          where: {
            section_id: sectionId,
          },
          select: {
            subject_id: true,
            teacher_id: true,
            class_id: true,
            section_id: true,
            class_subjects: {
              select: {
                subject_id: true,
                class_id: true,
                subject: {
                  select: {
                    subject_name: true,
                    subject_id: true,
                    subject_code: true,
                  },
                },
              },
            },
            teachers: {
              select: {
                first_name: true,
                last_name: true,
                teacher_id: true,
                abbreviation: true,
              },
            },
          },
        }),
      ]);

    if (!section) {
      return { status: Status.NOT_FOUND };
    }

    return {
      section,
      students,
      attendance,
      section_subjects,
      status: Status.OK,
    };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};

export const get_section_attendance = async (section_id: string) => {
  try {
    const [section_info, students, section_attendance] =
      await prisma.$transaction([
        prisma.sections.findUnique({
          where: { section_id: section_id },
          select: {
            section_id: true,
            section_name: true,
            academic_year: true,
            class_id: true,
            room_number: true,
          },
        }),
        prisma.student.findMany({
          where: {
            section_id: section_id,
          },
          select: {
            student_id: true,
            first_name: true,
            last_name: true,
            section_id: true,
          },
        }),
        prisma.student_attendance.findMany({
          where: {
            sectionId: section_id,
          },
          select: {
            id: true,
            student_id: true,
            sectionId: true,
            date: true,
            status: true,
          },
        }),
      ]);

    return {
      section: section_info,
      students,
      section_attendance,
      status: Status.OK,
    };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};
