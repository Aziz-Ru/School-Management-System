"use server";

import prisma from "../db";
import { ExamSchema } from "../schema/schema";

type ReturnProps = {
  error?: string;
  msg?: string;
};

export const add_exam_by_admin = async (
  formData: FormData
): Promise<ReturnProps> => {
  try {
    const data = Object.fromEntries(formData.entries());

    const validation = ExamSchema.safeParse({
      class_id: parseInt(data.class_id as string),
      type: data.exam_type,
      start_date: new Date(data.start_date as string),
      end_date: new Date(data.end_date as string),
    });

    if (!validation.success) {
      throw new Error(validation.error.errors[0].message);
    }
    if (
      new Date(validation.data.start_date) >
        new Date(validation.data.end_date) ||
      new Date(validation.data.start_date) < new Date()
    ) {
      throw new Error("Start date should be before end date");
    }
    // Save the exam in the database
    const sections = await prisma.sections.findMany({
      where: {
        class_id: validation.data.class_id,
        academic_year: new Date().getFullYear(),
      },
    });

    const [exams, section_subjects] = await prisma.$transaction([
      prisma.exam.findMany({
        where: {
          section_id: {
            in: sections.map((section) => section.section_id),
          },
          type: validation.data.type,
        },
      }),

      prisma.section_subject.findMany({
        where: {
          section_id: {
            in: sections.map((section) => section.section_id),
          },
        },
      }),
    ]);

    if (exams.length > 0) {
      throw new Error(`${validation.data.type} exam already exists`);
    }
    for (const section of sections) {
      await prisma.exam.create({
        data: {
          type: validation.data.type,
          start_date: validation.data.start_date,
          end_date: validation.data.end_date,
          publish_status: "DRAFT",
          section_id: section.section_id,
          exam_subjects: {
            createMany: {
              data: section_subjects
                .filter(
                  (section_subject) =>
                    section_subject.section_id === section.section_id
                )
                .map((section_subject) => {
                  return {
                    section_id: section_subject.section_id,
                    subject_name: section_subject.subject_name,
                    max_mark: 100,
                    passing_mark: 40,
                    weigtage: 100,
                  };
                }),
            },
          },
        },
      });
    }
    return {
      msg: `Exam added all section of class ${validation.data.class_id}`,
    };
  } catch (error: any) {
    return { error: error.message };
  }
};
