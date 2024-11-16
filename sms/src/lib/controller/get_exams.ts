"use server";

import prisma from "../db";
import { Classes, Exam, Status } from "../types";

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

export const get_exams_info = async (exam_id: string) => {
  try {
    const [] = await prisma.$transaction([
      prisma.exam_subjects.findMany({
        where: {
          exam_id,
        },
        select: {
          id: true,
          exam_id: true,
          exam: {
            select: {},
          },
        },
      }),
    ]);
  } catch (error) {}
};
