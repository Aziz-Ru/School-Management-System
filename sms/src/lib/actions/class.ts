"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

interface ReturnProps {
  error?: string;
  msg?: string;
}

export const addClassAction = async (): Promise<ReturnProps> => {
  try {
    await prisma.classes.createMany({
      data: [
        {
          class_id: 1,
          class_name: "One",
          level: "PRIMARY",
          description: "This is Class One",
        },
        {
          class_id: 2,
          class_name: "Two",
          level: "PRIMARY",
          description: "This is Class Two",
        },
        {
          class_id: 3,
          class_name: "Three",
          level: "PRIMARY",
          description: "This is Class Three",
        },
        {
          class_id: 4,
          class_name: "Four",
          level: "PRIMARY",
          description: "This is Class Four",
        },
        {
          class_id: 5,
          class_name: "Five",
          level: "PRIMARY",
          description: "This is Class Five",
        },
        {
          class_id: 6,
          class_name: "Six",
          level: "SECONDARY",
          description: "This is Class Six",
        },
        {
          class_id: 7,
          class_name: "Seven",
          level: "SECONDARY",
          description: "This is Class Seven",
        },
        {
          class_id: 8,
          class_name: "Eight",
          level: "SECONDARY",
          description: "This is Class Eight",
        },
        {
          class_id: 9,
          class_name: "Nine",
          level: "SECONDARY",
          description: "This is Class Nine",
        },
        {
          class_id: 10,
          class_name: "Ten",
          level: "SECONDARY",
          description: "This is Class Ten",
        },
      ],
    });
    revalidatePath("/dashboard");
    return { msg: "Class 1 to 10 Added Successfully" };
  } catch (error) {
    return { error: "Failed to create" };
  }
};

export const add_subject_to_class_action = async (
  formData: FormData
): Promise<ReturnProps> => {
  try {
    const subject_input = formData.get("subjects");
    const classId = parseInt(formData.get("class_id") as string);

    if (!subject_input || !classId || isNaN(classId)) {
      return { error: "Invalid Input" };
    }

    const subject_ids = subject_input!.toString().split(",");
    const subjects = subject_ids.map((sn) => {
      return {
        subject_name: sn,
        class_id: classId,
        description: "This is a Subject for Class",
      };
    });

    // Check if course already exist

    const existing_subject = await prisma.class_subject.findMany({
      where: {
        class_id: classId,
        subject_name: {
          in: [...subject_ids],
        },
      },
    });

    if (existing_subject.length > 0) {
      return { error: "Subject Already Exist" };
    }

    await prisma.class_subject.createMany({
      data: subjects,
    });

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/class/${classId}`);
    return { msg: "Subjects  Added Successfully" };
  } catch (error: any) {
    return { error: "Something went wrong" };
  }
};

// export const deleteCourseAction = async (id: string): Promise<ReturnProps> => {
//   try {
//     await prisma.course.delete({
//       where: {
//         courseName: id,
//       },
//     });
//     revalidatePath("list/cls");
//     return { msg: "Course deleted successfully" };
//   } catch (error: any) {
//     return { error: "Something went wrong" };
//   }
// };
