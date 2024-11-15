"use server";

import brypt from "bcrypt";
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

  const user = await prisma.user.findUnique({
    where: {
      id: validResult.data.uid,
      role: validResult.data.role,
    },
    select: {
      id: true,
      password: true,
      role: true,
      sex: true,
      status: true,
      lastLogin: true,
    },
  });

  if (!user) {
    return { error: "Invalid Credential" };
  }
  const isMatchPassword = await brypt.compare(
    validResult.data.password,
    user.password
  );

  if (user?.role === validResult.data.role && isMatchPassword) {
    await createSession({
      id: user.id,
      role: user.role,
      _xx_httpoui: user.sex,
      _u_ss_t: user.status,
      _l_l: user.lastLogin,
    });
    prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLogin: new Date().toISOString(),
      },
    });

    return { msg: "Logged In" };
  }

  return { error: "Invalid Credential" };
}

export async function logout() {
  deleteSession();
  redirect("/home");
}
