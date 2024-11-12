"use server";

import prisma from "@/lib/db";

import { revalidatePath } from "next/cache";
import { SectionSchema } from "../schema/schema";

interface ReturnProps {
  error?: string;
  msg?: string;
}

export const addSectionAction = async (
  formData: FormData
): Promise<ReturnProps> => {
  const academic_year = new Date().getFullYear();

  const validResult = SectionSchema.safeParse({
    section_name: formData.get("section_name") as string,
    class_id: parseInt(formData.get("class_id") as string),
    academic_year: academic_year,
    room_number: parseInt(formData.get("room_id") as string),
    class_teacher_id: parseInt(formData.get("teacher_id") as string),
    maximum_student: 50,
  });

  if (!validResult.success) {
    const error = validResult.error.issues[0].message;
    return { error: error };
  }

  const [existSection, isTeacherEnrolled, isRoomIdUse, numOfSection] =
    await prisma.$transaction([
      prisma.sections.findUnique({
        where: {
          section_name_class_id_academic_year: {
            section_name: validResult.data.section_name,
            class_id: validResult.data.class_id,
            academic_year: academic_year,
          },
        },
      }),
      prisma.sections.findUnique({
        where: {
          class_teacher_academic_year: {
            class_teacher: validResult.data.class_teacher_id,
            academic_year: academic_year,
          },
        },
      }),
      prisma.sections.findUnique({
        where: {
          room_number_academic_year: {
            room_number: validResult.data.room_number,
            academic_year: academic_year,
          },
        },
      }),
      prisma.sections.count(),
    ]);

  if (existSection) {
    return {
      error: "Section Name already Exists In This Year ",
    };
  }
  if (isTeacherEnrolled) {
    return { error: "Teacher Already Enrolled A Section" };
  }
  if (isRoomIdUse) {
    return { error: "Room Number Already Used" };
  }

  const [newSection, class_subjects] = await prisma.$transaction([
    prisma.sections.create({
      data: {
        section_name: validResult.data.section_name,
        class_id: validResult.data.class_id,
        academic_year: validResult.data.academic_year,
        room_number: validResult.data.room_number,
        class_teacher: validResult.data.class_teacher_id,
      },
    }),
    prisma.class_subject.findMany({
      where: {
        class_id: validResult.data.class_id,
      },
    }),
  ]);

  const section_subjects_data = class_subjects.map((class_subject) => {
    return {
      class_id: validResult.data.class_id,
      subject_id: class_subject.subject_id,
      section_id: newSection.section_id,
      teacher_id: parseInt(
        formData.get(`enrolled_teacher_${class_subject.subject_id}`) as string
      ),
    };
  });

  await prisma.section_subject.createMany({
    data: section_subjects_data,
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/class");
  return { msg: "Section added successfully" };
};

export const deleteSectionAction = async (id: string): Promise<ReturnProps> => {
  try {
    await prisma.sections.delete({
      where: {
        section_id: id,
      },
    });
    revalidatePath("/list/cls");
    return { msg: "Deleted successfully" };
  } catch (error) {
    return { error: "Failed to delete" };
  }
};
