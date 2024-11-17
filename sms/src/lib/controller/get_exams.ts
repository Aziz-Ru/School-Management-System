"use server";

import prisma from "../db";
import { Classes, Exam, ExamSubject, Status } from "../types";

type GetExamsReturnProps = {
  classData?: Classes[];
  exams?: Exam[];
  status: Status;
};

export const get_exams = async (): Promise<GetExamsReturnProps> => {
  try {
    const [classData, exams] = await prisma.$transaction([
      prisma.classes.findMany(),
      prisma.exam.findMany({
        include: {
          section: true,
        },
        orderBy: {
          start_date: "desc",
        },
      }),
    ]);
    return { classData, exams, status: Status.OK };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};

type GetExamsInfoReturnProps = {
  exam_subjects?: ExamSubject[];
  status: Status;
};

export const get_exams_info = async (
  exam_id: string
): Promise<GetExamsInfoReturnProps> => {
  try {
    const [exam_subjects] = await prisma.$transaction([
      prisma.exam_subjects.findMany({
        where: {
          exam_id,
        },
        select: {
          id: true,
          exam_id: true,
          exam: {
            select: {
              type: true,
              id: true,
              start_date: true,
              end_date: true,
              publish_status: true,
            },
          },
          subject: {
            select: {
              class_id: true,
              subject_name: true,
              section_id: true,
            },
          },
        },
      }),
    ]);
    if (exam_subjects.length === 0) {
      return { status: Status.NOT_FOUND };
    }

    return { exam_subjects, status: Status.OK };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};
