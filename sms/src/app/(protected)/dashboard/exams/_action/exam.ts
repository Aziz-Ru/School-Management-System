"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

type ReturnProps = {
  error?: string;
  msg?: string;
};

export const createExam = async (formData: FormData): Promise<ReturnProps> => {
  const id = formData.get("classId");
  const dates = JSON.parse(formData.get("dates") as string);
  const classId = parseInt(id as string);
  const type = formData.get("type");
  if (type !== "MID" && type !== "FINAL") {
    return { error: "Please Select Valid Type" };
  }
  try {
    if (isNaN(classId) || classId < 1 || classId > 10) {
      return {
        error: "Please select a class",
      };
    }

    const [sections, subjects] = await prisma.$transaction([
      prisma.section.findMany({
        where: {
          classId: classId,
          year: new Date().getFullYear(),
        },
        select: {
          id: true,
        },
      }),
      prisma.subject.findMany({
        where: {
          classId: classId,
        },
        select: {
          id: true,
        },
      }),
    ]);

    const error = dates.filter((d: any) => new Date(d.date) < new Date());

    if (error.length > 0) {
      return { error: "Please select dates greater than today" };
    }

    const existExam = await prisma.exam.findMany({
      where: {
        type: type,
        section: {
          id: {
            in: sections.map((s) => s.id),
          },
        },
      },
    });

    if (existExam.length > 0) {
      return {
        error: "Exam already created for this class",
      };
    }

    await prisma.exam.createMany({
      data: sections.map((section) => {
        return {
          sectionId: section.id,
          type: type,
        };
      }),
    });

    const exams = await prisma.exam.findMany({
      where: {
        section: {
          id: {
            in: sections.map((s) => s.id),
          },
        },
      },
      select: {
        id: true,
      },
    });

    await prisma.examCourse.createMany({
      data: exams.flatMap((exam) =>
        dates.map((d: any) => ({
          examId: exam.id,
          subjectId: d.id,
          date: new Date(d.date).toISOString(),
        }))
      ),
    });

    revalidatePath("/dashboard/exams");

    return {
      msg: "Exam created successfully",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};
