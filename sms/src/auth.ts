"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "./lib/db";
import { createSession, deleteSession } from "./session";

const userSchema = z.object({
  uid: z
    .number({
      required_error: "uId must be required",
      invalid_type_error: "uId must be a number",
    })
    .min(1000),
  password: z
    .string({
      required_error: "password must be required",
      invalid_type_error: "password must be a string",
    })
    .min(6, "Password must be atleast 6 chracters"),
  role: z.enum(["ADMIN", "TEACHER", "STUDENT"], {
    errorMap: () => ({ message: "Role Must Be Valid" }),
  }),
});

interface ReturnProps {
  error?: string;
  msg?: string;
}

export async function login(formData: FormData): Promise<ReturnProps> {
  const validResult = userSchema.safeParse({
    uid: parseInt(formData.get("uid") as string),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (validResult.error) {
    return { error: validResult.error.errors[0].message };
  }

  if (validResult.data.role === "ADMIN") {
    const admin = await prisma.admin.findUnique({
      where: {
        id: validResult.data.uid.toString(),
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!admin) {
      return { error: "Invalid Credentials" };
    }
    const isMatchPassword = await bcrypt.compare(
      validResult.data.password,
      admin.password
    );
    if (!isMatchPassword) {
      return { error: "Invalid Credentials" };
    }
    await createSession({
      user: {
        id: admin.id.toString(),
        role: validResult.data.role,
        fullName: "ADMIN",
      },
    });
    return { msg: "Admin Login Successully" };
  }

  if (validResult.data.role === "TEACHER") {
    const teacher = await prisma.teacher.findUnique({
      where: {
        id: validResult.data.uid,
      },
      select: {
        id: true,
        password: true,
        fullName: true,
        img: true,
        createdAt: true,
      },
    });
    if (!teacher) {
      return { error: "Invalid Credentials" };
    }
    const isMatchPassword = await bcrypt.compare(
      validResult.data.password,
      teacher.password
    );

    if (!isMatchPassword) {
      return { error: "Invalid Credentials" };
    }
    await createSession({
      user: {
        id: teacher.id.toString(),
        img: teacher.img as string,
        role: validResult.data.role,
        fullName: teacher.fullName,
        createdAt: teacher.createdAt.toDateString(),
      },
    });

    return { msg: `${teacher.id} Login Successfully` };
  }

  if (validResult.data.role === "STUDENT") {
    const student = await prisma.student.findUnique({
      where: {
        id: validResult.data.uid,
      },
      select: {
        id: true,
        password: true,
        fullName: true,
        sectionId: true,
        img: true,
        createdAt: true,
      },
    });
    if (!student) {
      return { error: "Invalid Credential" };
    }
    const isMatchPassword = await bcrypt.compare(
      validResult.data.password,
      student.password
    );

    if (!isMatchPassword) {
      return { error: "Invalid Credentials" };
    }

    await createSession({
      user: {
        id: student.id.toString(),
        role: validResult.data.role,
        fullName: student.fullName,
        sectionId: student.sectionId,
        createdAt: student.createdAt.toDateString(),
        img: student.img as string,
      },
    });
    return { msg: `${student.id} Login Successfully` };
  }

  return { msg: "Invalid Credential" };
}

export async function logout() {
  deleteSession();
  redirect("/home");
}
