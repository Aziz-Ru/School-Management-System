"use server";

import prisma from "@/lib/db";

import { revalidatePath } from "next/cache";
import { z } from "zod";

interface Section {
  id: string;
  sectionName: string;
  year: string;
  classRoom: {
    id: string;
    className: string;
    classId: number;
  };
}

interface ReturnProps {
  error?: string;
  msg?: string;
}

const sectionSchema = z.object({
  sectionName: z
    .string({
      required_error: "sectionName must be required",
      invalid_type_error: "sectionName must be a String",
    })
    .min(2, "section name must be atleast 2 chracters")
    .max(20, "section name must be no more than 20 chracters"),
  year: z
    .number({
      required_error: "year must be required",
      invalid_type_error: "year must be a number",
    })
    .int(),
  classId: z
    .number({
      required_error: "classId must be required",
      invalid_type_error: "classId must be a Number",
    })
    .int()
    .min(1, "class id must be in 1 to 12")
    .max(12, "class id must be in 1 to 12"),
  teacherId: z.number().int(),
});

export const addSectionAction = async (
  formData: FormData
): Promise<ReturnProps> => {
  const currentYear = new Date().getFullYear();
  console.log(formData.get("teacherId"));
  const validResult = sectionSchema.safeParse({
    sectionName: formData.get("sectionName") as string,
    year: currentYear,
    classId: parseInt(formData.get("id") as string),
    teacherId: parseInt(formData.get("teacherId") as string),
  });

  if (!validResult.success) {
    const error = validResult.error.issues[0].message;
    return { error: error };
  }
  const [existSection, isTeacherEnrolled, numOfSection] =
    await prisma.$transaction([
      prisma.section.findFirst({
        where: {
          sectionName: validResult.data.sectionName,
          year: validResult.data.year,
          classId: validResult.data.classId,
        },
      }),
      prisma.section.findFirst({
        where: {
          sectionTeacherId: validResult.data.teacherId,
          year: currentYear,
        },
      }),
      prisma.section.count(),
    ]);

  if (existSection) {
    return {
      error: "Section Name Already Exists In This Year ",
    };
  }
  if (isTeacherEnrolled) {
    return { error: "Teacher Already Enrolled A Section" };
  }

  const newSection = await prisma.section.create({
    data: {
      index: numOfSection + 1,
      sectionName: validResult.data.sectionName,
      year: validResult.data.year,
      classTable: { connect: { id: validResult.data.classId } },
      sectionTeacher: {
        connect: {
          id: validResult.data.teacherId,
        },
      },
    },
  });

  revalidatePath("/dashboard");
  return { msg: "Section added successfully" };
};

export const deleteSectionAction = async (id: string): Promise<ReturnProps> => {
  try {
    await prisma.section.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/list/cls");
    return { msg: "Deleted successfully" };
  } catch (error) {
    return { error: "Failed to delete" };
  }
};
