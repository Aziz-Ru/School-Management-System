"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface ReturnProps {
  error?: string;
  msg?: string;
}

interface inputProps {
  formData: FormData;
}

const courseSchema = z.object({
  courseName: z
    .string({
      required_error: "course name must be 3 chracters",
      invalid_type_error: "course name must be a String",
    })
    .min(3, "course name must be a String"),
  mark: z.enum(["100", "50"], {
    errorMap: () => ({ message: "Mark must be either 100 or 50" }),
  }),
});

export const addCourseAction = async (
  formData: FormData
): Promise<ReturnProps> => {
  try {
    const validResult = courseSchema.safeParse({
      courseName: formData.get("courseName"),
      mark: formData.get("mark"),
    });

    if (!validResult.success) {
      const err = validResult.error.issues[0].message;
      return { error: err };
    }
    const existedCourse = await prisma.course.findFirst({
      where: {
        courseName: validResult.data.courseName,
      },
    });

    if (existedCourse) {
      return { error: "Course Already Exists" };
    }

    await prisma.course.create({
      data: {
        courseName: validResult.data.courseName,
        mark: parseInt(validResult.data.mark),
      },
    });

    revalidatePath("/list/course");
    revalidatePath("list/cls");
    return { msg: "Course added successfully" };
  } catch (error: any) {
    // console.log(error.message);
    return { error: "Something went wrong" };
  }
};

// export const deleteCourseAction = async (id: string): Promise<ReturnProps> => {
//   try {
//     await prisma.course.delete({
//       where: {
//         id: id,
//       },
//     });
//     revalidatePath("list/cls");
//     return { msg: "Course deleted successfully" };
//   } catch (error: any) {
//     console.log(error.message);
//     return { error: "Something went wrong" };
//   }
// };
