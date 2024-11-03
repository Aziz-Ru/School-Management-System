"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const NoticeSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(5, "Title must be atleast 5 characters")
    .max(200, "Title must be no more than 100 characters"),
  content: z.string({
    required_error: "Content is required",
    invalid_type_error: "Content must be a string",
  }),
});

interface ReturnProps {
  error?: string;
  msg?: string;
}

export const createNotice = async (
  formData: FormData
): Promise<ReturnProps> => {
  try {
    const validResult = NoticeSchema.safeParse({
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    });

    if (!validResult.success) {
      return { error: validResult.error.errors[0].message };
    }
    
    await prisma.notice.create({
      data: {
        title: validResult.data.title,
        content: validResult.data.content,
      },
    });
    revalidatePath("/");
    return { msg: "Notice created successfully" };
  } catch (error) {
    console.error("Error creating notice", error);
    return { error: "An error occurred while creating the notice" };
  }
};
