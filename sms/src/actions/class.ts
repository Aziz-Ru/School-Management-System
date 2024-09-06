"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addClass = async () => {
  try {
    await prisma.classRoom.createMany({
      data: [
        { classId: 1, className: "One" },
        { classId: 2, className: "Two" },
        { classId: 3, className: "Three" },
        { classId: 4, className: "Four" },
        { classId: 5, className: "Five" },
        { classId: 6, className: "Six" },
        { classId: 7, className: "Seven" },
        { classId: 8, className: "Eight" },
        { classId: 9, className: "Nine" },
        { classId: 10, className: "Ten" },
        { classId: 11, className: "Eleven" },
        { classId: 12, className: "Twelve" },
      ],
    });
    revalidatePath("/admin/class");
  } catch (error) {
    console.log(error);
  }
};
