"use server";
import prisma from "@/lib/db";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { StudentSchema } from "../schema/schema";
import { UserRole } from "../types";
interface ReturnProps {
  error?: string;
  msg?: string;
}

export const addStudentAction = async (
  formData: FormData
): Promise<ReturnProps> => {
  try {
    const class_id = parseInt(formData.get("class_id") as string);

    const validateResult = StudentSchema.safeParse({
      id: parseInt(formData.get("student_id") as string),
      email: formData.get("email"),
      password: formData.get("password"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      address: formData.get("address"),
      section_id: formData.get("section_id"),
      role: "STUDENT",
      sex: formData.get("gender"),
      phone: formData.get("phone"),
      dob: new Date(formData.get("dob") as string),
      level: class_id > 5 ? "SECONDARY" : "PRIMARY",
    });

    if (!validateResult.success) {
      return { error: validateResult.error.errors[0].message };
    }

    const isExistId = await prisma.student.findUnique({
      where: { student_id: validateResult.data.id },
    });

    if (isExistId) {
      return { error: "Student Id already exists" };
    }

    const hasedPassword = await bcrypt.hash(validateResult.data.password, 10);

    await prisma.user.create({
      data: {
        id: validateResult.data.id,
        email: validateResult.data.email,
        password: hasedPassword,
        role: UserRole.STUDENT,
        sex: validateResult.data.sex,
        lastLogin: new Date().toISOString(),
        phone: validateResult.data.phone,
        address: validateResult.data.address,
        studentProfile: {
          create: {
            student_id_str: validateResult.data.id.toString(),
            first_name: validateResult.data.first_name,
            last_name: validateResult.data.last_name,
            dob: new Date(validateResult.data.dob).toISOString(),
            level: validateResult.data.level,
            section_id: validateResult.data.section_id,
          },
        },
      },
    });

    revalidatePath("/dashboard/students");
    revalidatePath("/dashboard");

    return { msg: "Student added successfully" };
  } catch (error: any) {
    console.log(error.message);
    return { error: "Failed to add student" };
  }
};
