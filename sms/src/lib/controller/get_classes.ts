"use server";

import prisma from "../db";
import {
  Classes,
  ClassSubject,
  Section,
  Status,
  Subject,
  Teacher,
} from "../types";

type getClassInfoReturnProps = {
  classes?: Classes[];
  status: Status;
};

export const getClassesInfos = async (
  q: string
): Promise<getClassInfoReturnProps> => {
  try {
    const classInfo = await prisma.classes.findMany({
      where: { class_name: { contains: q } },
      select: {
        class_id: true,
        class_name: true,
        level: true,
        _count: {
          select: {
            subjects: true,
            sections: true,
          },
        },
      },
    });

    return { classes: classInfo, status: Status.OK };
  } catch (error: any) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};

type ReturnProps = {
  classInfo?: Classes;
  subjects?: Subject[];
  sections?: Section[];
  teachers?: Teacher[];
  class_subject?: ClassSubject[];
  status: Status;
};

export async function getClassData(classId: number): Promise<ReturnProps> {
  try {
    const level = classId < 6 ? "PRIMARY" : "SECONDARY";

    // get cless data,class_subject,subjects,teachers
    const [classData, class_subjects, teachers, sections] =
      await prisma.$transaction([
        prisma.classes.findFirst({
          where: { class_id: classId },
        }),
        prisma.class_subject.findMany({
          where: { class_id: classId },
          select: {
            subject_name: true,
            class_id: true,
            description: true,
            subject: {
              select: {
                subject_name: true,
                subject_code: true,
                teacher: {
                  select: {
                    first_name: true,
                    last_name: true,
                    teacher_id: true,
                  },
                },
              },
            },
          },
        }),
        prisma.teacher.findMany({
          where: { level: level },
          select: {
            teacher_id: true,
            first_name: true,
            last_name: true,
            subject: true,
            class_teacher: true,
          },
        }),
        prisma.sections.findMany({
          where: { class_id: classId },
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
        }),
      ]);

    if (!classData) {
      return { status: Status.NOT_FOUND };
    }

    const subjects = await prisma.subject.findMany({
      where: {
        NOT: {
          subject_name: {
            in: class_subjects.map((data) => data.subject.subject_name),
          },
        },
      },
    });

    return {
      classInfo: classData!,
      class_subject: class_subjects,
      teachers: teachers,
      subjects: subjects,
      sections: sections,
      status: Status.OK,
    };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
}
