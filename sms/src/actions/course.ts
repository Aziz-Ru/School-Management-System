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

export const addCourse = async ({
  formData,
}: inputProps): Promise<ReturnProps> => {
  try {
    const departmentId =
      parseInt(formData.get("id") as string) < 6
        ? "cm1uy4ali0005ya9v9mh0eols"
        : formData.get("deptId");
    const validResult = courseSchema.safeParse({
      courseName: formData.get("courseName"),
      totalMarks: 100,
      classId: parseInt(formData.get("id") as string),
      deptId: departmentId,
    });

    console.log(departmentId);

    if (!validResult.success) {
      console.log(validResult.error.issues[0].path);
      const err = validResult.error.issues[0].message;
      return { error: err };
    }
    console.log(validResult.data.deptId);

    const existedCourse = await prisma.course.findFirst({
      where: {
        courseName: validResult.data.courseName,
        classId: validResult.data.classId,
      },
    });

    if (existedCourse) {
      return { error: "Course already exists" };
    }

    await prisma.course.create({
      data: {
        courseName: validResult.data.courseName,
        class: { connect: { id: validResult.data.classId } },
        department: { connect: { id: validResult.data.deptId } },
      },
    });

    revalidatePath("list/cls");
    return { msg: "Course added successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
