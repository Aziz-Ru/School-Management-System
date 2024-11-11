"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { SubjectSchema } from "../schema/schema";

interface ReturnProps {
  error?: string;
  msg?: string;
}

export const addSubjectAction = async (
  formData: FormData
): Promise<ReturnProps> => {
  try {
    const validResult = SubjectSchema.safeParse({
      subject_name: formData.get("name"),
      subject_code: parseInt(formData.get("code") as string),
    });

    if (!validResult.success) {
      const err = validResult.error.issues[0].message;
      return { error: err };
    }
    const existedCourse = await prisma.subject.findFirst({
      where: {
        subject_name: validResult.data.subject_name,
      },
    });

    if (existedCourse) {
      return { error: "Course Already Exists" };
    }

    await prisma.subject.create({
      data: {
        subject_name: validResult.data.subject_name,
        subject_code: validResult.data.subject_code,
      },
    });

    revalidatePath("/dashboard");

    return { msg: "Course added successfully" };
  } catch (error: any) {
    // console.log(error.message);
    return { error: "Something went wrong" };
  }
};