"use server";

import prisma from "@/lib/db";
import { teacherSchema } from "@/lib/schema/Schema";
import brcypt from "bcrypt";
import { revalidatePath } from "next/cache";

interface ReturnProps {
  error?: string;
  msg?: string;
}

export const addTeacher = async (formData: FormData): Promise<ReturnProps> => {
  try {
    // console.log(formData.get("rank"));
    const validateResult = teacherSchema.safeParse({
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      sex: formData.get("sex"),
      level: formData.get("level"),
      deptId: formData.get("department") || undefined,
      rank: formData.get("rank"),
      id: parseInt(formData.get("id") as string),
      password: formData.get("password"),
    });

    if (!validateResult.success) {
      return { error: validateResult.error.errors[0].message };
    }
    if (validateResult.data.level != "PRIMARY" && !validateResult.data.deptId) {
      return { error: "Department is required" };
    }

    // console.log(validateResult.data.rank);
    const hashedPassword = await brcypt.hash(validateResult.data.password, 10);
    // find by id
    const userId = `T-${validateResult.data.id}`;
    const isExistId = await prisma.teacher.findUnique({
      where: { id: userId },
    });
    if (isExistId) {
      return { error: "This Id already exist" };
    }
    // Add employee to database

    await prisma.teacher.create({
      data: {
        id: userId,
        fullName: validateResult.data.fullName,
        email: validateResult.data.email,
        phone: validateResult.data.phone,
        sex: validateResult.data.sex,
        level: validateResult.data.level,
        deptId: validateResult.data.deptId,
        address: validateResult.data.address,
        rank: validateResult.data.rank,
        password: hashedPassword,
      },
    });
    revalidatePath("/list/teachers");
    return { msg: "Employee added successfully" };
  } catch (error: any) {
    // console.log(error.message);
    return { error: "Failed to add employee" };
  }
};

export const deleteTeacher = async (
  formData: FormData
): Promise<ReturnProps> => {
  const id = formData.get("id") as string | null;
  // console.log(id);
  if (!id) {
    return { error: "Failed to delete" };
  }
  try {
    await prisma.teacher.delete({ where: { id: id } });
    revalidatePath("/list/teachers");
    return { msg: "Delete Successfully" };
  } catch (error: any) {
    // console.log(error.message);
    return { error: "Failed to delete" };
  }
};
