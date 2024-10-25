"use server";

import { z } from "zod";
import prisma from "./lib/db";
import { createSession } from "./session";

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
  let user;
  if (validResult.data.role === "ADMIN") {
    user = await prisma.admin.findUnique({
      where: {
        id: validResult.data.uid.toString(),
      },
    });
  }

  if (validResult.data.role === "TEACHER") {
    user = await prisma.teacher.findUnique({
      where: {
        id: validResult.data.uid.toString(),
      },
    });
  }

  if (validResult.data.role === "STUDENT") {
    user = await prisma.student.findUnique({
      where: {
        id: validResult.data.uid.toString(),
      },
    });
  }

  if (!user) {
    return { error: "Invalid Credentials" };
  }

  if (user.password !== validResult.data.password) {
    return { error: "Invalid Credentials" };
  }
  await createSession(user.id, validResult.data.role);
  return { msg: "Logged In" };
}
