"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

interface ResultProp {
  error?: string;
  msg?: string;
}

export const addClassAction = async (): Promise<ResultProp> => {
  try {
    await prisma.class.createMany({
      data: [
        {
          id: 1,
          className: "One",
          level: "PRIMARY",
        },
        {
          id: 2,
          className: "Two",
          level: "PRIMARY",
        },
        {
          id: 3,
          className: "Three",
          level: "PRIMARY",
        },
        {
          id: 4,
          className: "Four",
          level: "PRIMARY",
        },
        {
          id: 5,
          className: "Five",
          level: "PRIMARY",
        },
        {
          id: 6,
          className: "Six",
          level: "SCHOOL",
        },
        {
          id: 7,
          className: "Seven",
          level: "SCHOOL",
        },
        {
          id: 8,
          className: "Eight",
          level: "SCHOOL",
        },
        {
          id: 9,
          className: "Nine",
          level: "SCHOOL",
        },
        {
          id: 10,
          className: "Ten",
          level: "SCHOOL",
        },
      ],
    });
    revalidatePath("/list/cls");
    return { msg: "Class 1 to 10 Added Successfully" };
  } catch (error) {
    return { error: "Failed to create" };
  }
};
