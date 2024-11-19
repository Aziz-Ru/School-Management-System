"use server";

import prisma from "../db";
import { Exam, ExamResult, Status } from "../types";

type GetAllExamReturnProps = {
  exams: Exam[];
};
export const getAll_exams = async (): Promise<GetAllExamReturnProps> => {
  const exams = await prisma.exam.findMany({
    where: {
      publish_status: "PUBLISHED",
    },
    select: {
      id: true,
      type: true,
      start_date: true,
      end_date: true,
      publish_status: true,
      section: {
        select: {
          class_id: true,
          section_name: true,
          section_id: true,
          academic_year: true,
          room_number: true,
        },
      },
    },

    orderBy: { createdAt: "desc" },
  });

  return { exams };
};

type GetExamResultReturnProps = {
  exam?: Exam;
  exam_results?: ExamResult[];
  status: Status;
};
export const get_exam_results = async (
  id: string
): Promise<GetExamResultReturnProps> => {
  try {
    const [exam, exam_results] = await prisma.$transaction([
      prisma.exam.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          type: true,
          start_date: true,
          end_date: true,
          publish_status: true,
          section: {
            select: {
              class_id: true,
              section_name: true,
              section_id: true,
              academic_year: true,
              room_number: true,
            },
          },
        },
      }),
      prisma.exam_result.findMany({
        where: {
          examId: id,
        },
        select: {
          id: true,
          gpa: true,
          student_id: true,
          student: {
            select: {
              first_name: true,
              last_name: true,
              student_id: true,
            },
          },
        },
      }),
    ]);
    if (!exam) return { status: Status.NOT_FOUND };
    return { exam, exam_results, status: Status.OK };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};
