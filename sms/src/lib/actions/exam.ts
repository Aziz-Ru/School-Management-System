"use server";

import { revalidatePath } from "next/cache";
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
      include: {
        students: {
          select: {
            student_id: true,
          },
        },
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
      const newExam = await prisma.exam.create({
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

      const examSubjects = await prisma.exam_subjects.findMany({
        where: { exam_id: newExam.id },
      });

      for (const student of section.students) {
        await prisma.subject_marks.createMany({
          data: examSubjects.map((examSubject) => {
            return {
              exam_subject_id: examSubject.id,
              student_id: student.student_id,
              obtained_marks: 0,
              percentage: 0,
              grade: "F",
              practical_marks: 0,
              theory_mark: 0,
              assignment_mark: 0,
            };
          }),
        });
      }
    }

    revalidatePath("/dashboard/exams");
    return {
      msg: `Exam added all section of class ${validation.data.class_id}`,
    };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const update_exam_marks = async (
  formData: FormData
): Promise<ReturnProps> => {
  try {
    const { exam_subject_id, ...student_ids } = Object.fromEntries(
      formData.entries()
    );
    Object.entries(student_ids).forEach(([key, value]) => {
      const student_id = Number(key);
      const mark = Number(value);
      if (isNaN(student_id)) {
        throw new Error("Invalid student");
      }
      if (isNaN(Number(mark)) || mark < 0 || mark > 100) {
        throw new Error("Invalid  marks");
      }
    });

    for (const [student_id, obtained_marks] of Object.entries(student_ids)) {
      await prisma.subject_marks.update({
        where: {
          exam_subject_id_student_id: {
            exam_subject_id: exam_subject_id as string,
            student_id: parseInt(student_id),
          },
        },
        data: {
          obtained_marks: parseInt(obtained_marks as string),
          percentage: (parseInt(obtained_marks as string) / 100) * 100,
          grade: calculateGrade(parseInt(obtained_marks as string)),
        },
      });
    }

    revalidatePath("/dashboard/exams");
    return { msg: "Marks updated successfully" };
  } catch (error: any) {
    return { error: error.message };
  }
};

const calculateGrade = (marks: number): string => {
  if (marks >= 80) return "A+";
  if (marks >= 70) return "A";
  if (marks >= 60) return "A-";
  if (marks >= 50) return "B";
  if (marks >= 40) return "C";
  if (marks >= 33) return "D";

  return "F";
};

export const publish_exam = async (formData: FormData) => {
  const inputData = Object.fromEntries(formData.entries());
  try {
    console.log(inputData);
  } catch (error: any) {
    return { error: error.message };
  }
};
