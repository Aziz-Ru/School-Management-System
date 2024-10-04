"use server";

import prisma from "@/lib/db";
import { employeeSchema } from "@/lib/schema/Schema";
import brcypt from "bcrypt";
import { revalidatePath } from "next/cache";

interface ReturnProps {
  error?: string;
  success?: string;
}

export const addEmployee = async (formData: FormData): Promise<ReturnProps> => {
  try {
    const validateResult = employeeSchema.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      sex: formData.get("sex"),
      joinDate: new Date(formData.get("joinDate") as string),
      deptId: formData.get("department") || undefined,
      role: formData.get("role"),
      employeeId: parseInt(formData.get("employeeId") as string),
      password: formData.get("password"),
    });
    if (!validateResult.success) {
      return { error: validateResult.error.errors[0].message };
    }
    const hashedPassword = await brcypt.hash(validateResult.data.password, 10);
    // find by id
    const existingEmployee = await prisma.employee.findUnique({
      where: { employeeId: validateResult.data.employeeId.toString() },
    });
    if (existingEmployee) {
      return { error: "Employee already exists" };
    }
    // Add employee to database
    await prisma.employee.create({
      data: {
        firstName: validateResult.data.firstName,
        lastName: validateResult.data.lastName,
        email: validateResult.data.email,
        phone: validateResult.data.phone,
        sex: validateResult.data.sex,
        joinDate: validateResult.data.joinDate.toString(),
        department: {
          connect: {
            id: validateResult.data.deptId,
          },
        },
        rank: validateResult.data.role,
        employeeId: validateResult.data.employeeId.toString(),
        password: hashedPassword,
      },
    });
    revalidatePath("/admin/employee");
    return { success: "Employee added successfully" };
  } catch (error: any) {
    console.log(error.message);
    return { error: "Failed to add employee" };
  }
};
