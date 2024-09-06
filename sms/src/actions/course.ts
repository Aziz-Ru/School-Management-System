"use server";

import prisma from "@/lib/db";
import { courseSchema } from "@/lib/schema/Schema";
import { revalidatePath } from "next/cache";

interface ReturnProps {
  error: string;
  success: string;
}

export const addCourse = async ({
  formData,
  classId,
}: {
  formData: FormData;
  classId: string;
}): Promise<ReturnProps> => {
  try {
    const res = courseSchema.safeParse({
      courseName: formData.get("courseName"),
      totalMarks: parseInt(formData.get("totalMarks") as string),
      classId: classId,
      deptId: formData.get("deptId"),
    });

    if (!res.success) {
      const err = res.error.issues[0].message;
      return { error: err, success: "" };
    }

    const existedCourse = await prisma.course.findFirst({
      where: { courseName: res.data.courseName, classId: res.data.classId },
    });
    if (existedCourse) {
      return { error: "Course already exists", success: "" };
    }
    await prisma.course.create({
      data: {
        courseName: res.data.courseName,
        totalMarks: Number(res.data.totalMarks),
        classRoom: { connect: { id: res.data.classId } },
        department: { connect: { id: res.data.deptId } },
      },
    });
    revalidatePath("/admin/class");
    return { error: "", success: "Course added successfully" };
  } catch (error) {
    return { error: "Something went wrong", success: "" };
  }
};
