"use server";

import prisma from "@/lib/db";
import brcypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { TeacherSchema } from "../schema/schema";

interface ReturnProps {
  error?: string;
  msg?: string;
}

export const addTeacherAction = async (
  formData: FormData
): Promise<ReturnProps> => {
  try {
    const validateResult = TeacherSchema.safeParse({
      id: parseInt(formData.get("id") as string),
      email: formData.get("email"),
      password: formData.get("password"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      role: "TEACHER",
      sex: formData.get("gender"),
      rank: formData.get("rank"),
      phone: formData.get("phone"),
      level: formData.get("level"),
      subject_id: formData.get("subject_id"),
      degrees: formData.get("degree"),
      address: formData.get("address"),
    });
    // validate form data
    if (!validateResult.success) {
      return { error: validateResult.error.errors[0].message };
    }

    // find by id

    const isExistId = await prisma.user.findUnique({
      where: { id: validateResult.data.id },
    });

    if (isExistId) {
      return { error: "This Id Already Exist" };
    }
    // Hash
    const hashedPassword = await brcypt.hash(validateResult.data.password, 10);

    // Add employee to database

    await prisma.user.create({
      data: {
        id: validateResult.data.id,
        email: validateResult.data.email,
        phone: validateResult.data.phone,
        sex: validateResult.data.sex,
        level: validateResult.data.level,
        address: validateResult.data.address,
        rank: validateResult.data.rank,
        password: hashedPassword,
        courses: {
          connect: courses.map((cn) => ({ courseName: cn })),
        },
      },
    });

    revalidatePath("/dashboard");

    return { msg: "Employee added successfully" };
  } catch (error: any) {
    // console.log(error.message);
    return { error: "Failed to add employee" };
  }
};

// export const deleteTeacherAction = async (id: string): Promise<ReturnProps> => {
//   if (!id) {
//     return { error: "Failed to delete" };
//   }
//   try {
//     await prisma.teacher.delete({ where: { id: parseInt(id) } });
//     revalidatePath("/list/teachers");
//     revalidatePath("/list/cls");
//     return { msg: "Delete Successfully from Teacher List" };
//   } catch (error: any) {
//     // console.log(error.message);
//     return { error: "Failed to Delete" };
//   }
// };