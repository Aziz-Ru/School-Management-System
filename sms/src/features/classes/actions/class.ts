"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

interface ResultProp {
  error?: string;
  msg?: string;
}

export const addPrimary = async (): Promise<ResultProp> => {
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
      ],
    });
    revalidatePath("/list/cls");
    return { msg: "Primary classes added" };
  } catch (error) {
    return { error: "Failed to create" };
  }
};

export const addSchool = async (): Promise<ResultProp> => {
  try {
    await prisma.class.createMany({
      data: [
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
    return { msg: "School classes added" };
  } catch (error) {
    return { error: "Failed to create" };
  }
};

export const addAllClass = async (): Promise<ResultProp> => {
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
        {
          id: 11,
          className: "Eleven",
          level: "COLLEGE",
        },
        {
          id: 12,
          className: "Twelve",
          level: "COLLEGE",
        },
      ],
    });
    revalidatePath("/list/cls");
    return { msg: "All classes added" };
  } catch (error) {
    return { error: "Failed to create" };
  }
};

export const addCollege = async (): Promise<ResultProp> => {
  try {
    await prisma.class.createMany({
      data: [
        {
          id: 11,
          className: "Eleven",
          level: "COLLEGE",
        },
        {
          id: 12,
          className: "Twelve",
          level: "COLLEGE",
        },
      ],
    });
    revalidatePath("/list/cls");
    return { msg: "College classes added" };
  } catch (error) {
    return { error: "Failed to create" };
  }
};
