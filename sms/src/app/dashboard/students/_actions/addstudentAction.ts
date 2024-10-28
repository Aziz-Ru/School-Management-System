"use server";
import prisma from "@/lib/db";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { z } from "zod";
interface ReturnProps {
  error?: string;
  msg?: string;
}

export const addStudentAction = async (
  formData: FormData
): Promise<ReturnProps> => {
  try {
    const validateResult = studentSchema.safeParse({
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      sex: formData.get("sex"),
      dob: new Date(formData.get("dob") as string),
      studentId: parseInt(formData.get("studentId") as string),
      sectionId: formData.get("sectionId"),
      address: formData.get("address"),
      password: formData.get("password"),
    });

    if (!validateResult.success) {
      return { error: validateResult.error.errors[0].message };
    }

    const isExistId = await prisma.student.findUnique({
      where: { id: validateResult.data.studentId },
    });
    if (isExistId) {
      return { error: "Student Id already exists" };
    }

    const hasedPassword = await bcrypt.hash(validateResult.data.password, 10);

    await prisma.student.create({
      data: {
        id: validateResult.data.studentId,
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
    revalidatePath("/list/class");
    return { msg: "Student added successfully" };
  } catch (error: any) {
    console.log(error.message);
    return { error: "Failed to add student" };
  }
};

// export const deleteStudent = async (
//   formData: FormData
// ): Promise<ReturnProps> => {
//   const id = formData.get("id") as string | null;
//   // console.log(id);
//   if (!id) {
//     return { error: "Failed to delete" };
//   }
//   try {
//     await prisma.student.delete({ where: { id: id } });
//     revalidatePath("/list/students");
//     return { msg: "Delete Successfully" };
//   } catch (error: any) {
//     return { error: "Failed to delete" };
//   }
// };

const studentSchema = z.object({
  fullName: z
    .string({
      required_error: "fullName must be required",
      invalid_type_error: "fullName must be a string",
    })
    .min(4, "fullName must be atleast 4 chracters")
    .max(20, "fullName must be no more than 20 chracters"),
  phone: z
    .string({
      required_error: "phone must be required",
      invalid_type_error: "phone must be a string",
    })
    .regex(/^(\+8801|01)[0-9]\d{8}$/, {
      message: "Invalid Bangladeshi Phone Number",
    }),
  sex: z.enum(["MALE", "FEMALE"], {
    errorMap: () => ({ message: "Sex must be either MALE or FEMALE" }),
  }),

  dob: z.date().refine(
    (dob) => {
      const today = new Date();
      const fiverYearsAgo = new Date(
        today.getFullYear() - 5,
        today.getMonth(),
        today.getDate()
      );
      return dob < fiverYearsAgo;
    },
    { message: "Date of birth must be 5 years ago" }
  ),
  sectionId: z
    .string({
      required_error: "sectionId must be required",
      invalid_type_error: "sectionId must be a string",
    })
    .uuid(),
  address: z
    .string({
      required_error: "address must be required",
      invalid_type_error: "address must be a string",
    })
    .trim()
    .min(3, "address must be atleast 3 chracters"),

  studentId: z
    .number({
      required_error: "studentId must be required",
      invalid_type_error: "studentId must be a number",
    })
    .int()
    .min(200000, "studentId must be greater than 200000"),

  password: z
    .string({
      required_error: "password must be required",
      invalid_type_error: "password must be a string",
    })
    .min(6, "password must be atleast 6 chracters"),
});
