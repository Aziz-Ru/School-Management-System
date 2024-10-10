"use server";
import prisma from "@/lib/db";
import { studentSchema } from "@/lib/schema/Schema";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
interface ReturnProps {
  error?: string;
  msg?: string;
}
export const addStudent = async (formData: FormData): Promise<ReturnProps> => {
  try {
    const validateResult = studentSchema.safeParse({
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      sex: formData.get("sex"),
      dob: new Date(formData.get("dob") as string),
      studentId: parseInt(formData.get("id") as string),
      sectionId: formData.get("sectionId"),
      address: formData.get("address"),
      password: formData.get("password"),
    });

    if (!validateResult.success) {
      return { error: validateResult.error.errors[0].message };
    }
    const studentId = `S-${validateResult.data.studentId}`;
    // const isExistId = await prisma.student.findUnique({
    //   where: { id: studentId },
    // });
    // if (isExistId) {
    //   return { error: "Student Id already exists" };
    // }

    const hasedPassword = await bcrypt.hash(validateResult.data.password, 10);

    await prisma.student.create({
      data: {
        id: studentId,
        fullName: validateResult.data.fullName,
        phone: validateResult.data.phone,
        password: hasedPassword,
        sex: validateResult.data.sex,
        address: validateResult.data.address,
        dob: `${validateResult.data.dob}`,
        section: { connect: { id: validateResult.data.sectionId } },
      },
    });

    revalidatePath("/list/students");
    revalidatePath("/list/sections");
    return { msg: "Student added successfully" };
  } catch (error: any) {
    console.log(error.message);
    return { error: "Failed to add student" };
  }
};

export const deleteStudent = async (
  formData: FormData
): Promise<ReturnProps> => {
  const id = formData.get("id") as string | null;
  // console.log(id);
  if (!id) {
    return { error: "Failed to delete" };
  }
  try {
    await prisma.student.delete({ where: { id: id } });
    revalidatePath("/list/students");
    return { msg: "Delete Successfully" };
  } catch (error: any) {
    return { error: "Failed to delete" };
  }
};
