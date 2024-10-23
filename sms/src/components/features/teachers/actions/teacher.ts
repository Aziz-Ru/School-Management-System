"use server";

import prisma from "@/lib/db";
import brcypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const teacherSchema = z.object({
  fullName: z
    .string({
      required_error: "FirstName must be required",
      invalid_type_error: "firstName must be a string",
    })
    .trim()
    .min(4, "FirstName must be atleast 4 chracters")
    .max(20, "FirstName must be no more than 20 chracters"),
  email: z
    .string({
      required_error: "Email must be required",
      invalid_type_error: "Email must be a string",
    })
    .email(),

  phone: z
    .string({
      required_error: "Phone must be required",
      invalid_type_error: "Phone must be a string",
    })
    .regex(/^(\+8801|01)[0-9]\d{8}$/, {
      message: "Invalid Bangladeshi Phone Number",
    }),

  sex: z.enum(["MALE", "FEMALE"], {
    errorMap: () => ({ message: "Gender must be either MALE or FEMALE" }),
  }),
  // Change the Zod schema to match the Prisma enum casing (uppercase).
  rank: z.enum(["SENIOR", "ASSISTANT"], {
    errorMap: () => ({
      message: "Rank must be either SENIOR or ASSISTANT",
    }),
  }),
  level: z.enum(["PRIMARY", "SCHOOL", "COLLEGE"], {
    errorMap: () => ({
      message: "Level must be either PRIMARY,SCHOOL or COLLEGE",
    }),
  }),

  address: z
    .string({
      required_error: "Address must be required",
      invalid_type_error: "Address must be a string",
    })
    .trim()
    .min(3, "Address must be atleast 3 chracters"),

  id: z
    .number({
      required_error: "Teacher Id must be required",
      invalid_type_error: "Teacher Id must be a number",
    })
    .int()
    .min(100, "Teacher Id must be atleast 100"),

  password: z
    .string({
      required_error: "Password must be required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, "Password must be atleast 6 chracters"),
});

interface ReturnProps {
  error?: string;
  msg?: string;
}

export const addTeacherAction = async (
  formData: FormData
): Promise<ReturnProps> => {
  try {
    const validateResult = teacherSchema.safeParse({
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      sex: formData.get("sex"),
      level: formData.get("level"),
      rank: formData.get("rank"),
      id: parseInt(formData.get("id") as string),
      password: formData.get("password"),
    });
    // validate form data
    if (!validateResult.success) {
      return { error: validateResult.error.errors[0].message };
    }
    // Hash
    const hashedPassword = await brcypt.hash(validateResult.data.password, 10);
    // find by id
    const userId = `T-${validateResult.data.id}`;
    const isExistId = await prisma.teacher.findUnique({
      where: { id: userId },
    });

    if (isExistId) {
      return { error: "This Id Already Exist" };
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

export const deleteTeacherAction = async (id: string): Promise<ReturnProps> => {
  if (!id) {
    return { error: "Failed to delete" };
  }
  try {
    await prisma.teacher.delete({ where: { id: id } });
    revalidatePath("/list/teachers");
    return { msg: "Delete Successfully from Teacher List" };
  } catch (error: any) {
    // console.log(error.message);
    return { error: "Failed to Delete" };
  }
};
