"use server";

import prisma from "@/lib/db";
import { courseSchema } from "@/lib/schema/Schema";
import { revalidatePath } from "next/cache";

interface ReturnProps {
  error?: string;
  msg?: string;
}

interface inputProps {
  formData: FormData;
}

export const addCourseAction = async (
  formData: FormData
): Promise<ReturnProps> => {
  try {
    const validResult = courseSchema.safeParse({
      courseName: formData.get("courseName"),
      totalMarks: 100,
      classId: parseInt(formData.get("id") as string),
    });

    if (!validResult.success) {
      const err = validResult.error.issues[0].message;
      return { error: err };
    }

    const existedCourse = await prisma.course.findFirst({
      where: {
        courseName: validResult.data.courseName,
        // classId: validResult.data.classId,
      },
    });

    if (existedCourse) {
      return { error: "Course already exists" };
    }
    console.log(existedCourse);
    if (validResult.data.classId <= 5) {
      await prisma.course.create({
        data: {
          courseName: validResult.data.courseName,
          // class: { connect: { id: validResult.data.classId } },
        },
      });
    }

    revalidatePath("list/cls");
    return { msg: "Course added successfully" };
  } catch (error: any) {
    console.log(error.message);
    return { error: "Something went wrong" };
  }
};

export const deleteCourseAction = async (id: string): Promise<ReturnProps> => {
  try {
    await prisma.course.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("list/cls");
    return { msg: "Course deleted successfully" };
  } catch (error: any) {
    console.log(error.message);
    return { error: "Something went wrong" };
  }
};
