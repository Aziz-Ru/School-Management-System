"use server";

import prisma from "@/lib/db";
import { facultySchema } from "@/lib/schema/Schema";
import { revalidatePath } from "next/cache";

interface ReturnProps {
  error: string;
  success: string;
}

export const getFaculty = async (formdata: FormData) => {
  try {
    const facultyName = formdata.get("facultyName") as string;
    const faculties = await prisma.faculty.findMany({
      where: { facultyName: { startsWith: facultyName } },
    });
    return faculties;
  } catch (error) {
    return [];
  }
};

export const addFaculty = async (formdata: FormData): Promise<ReturnProps> => {
  try {
    const resut = facultySchema.safeParse({
      facultyName: formdata.get("facultyName") as string,
    });

    if (!resut.success) {
      const err = resut.error.issues[0].message;
      return { error: err, success: "" };
    }
    const existingFaculty = await prisma.faculty.findFirst({
      where: { facultyName: resut.data.facultyName },
    });
    if (existingFaculty) {
      return { error: "Faculty already exists", success: "" };
    }

    await prisma.faculty.create({
      data: {
        facultyName: resut.data.facultyName as string,
      },
    });
    revalidatePath("/admin/dept");
    return { error: "", success: "Faculty added successfully" };
  } catch (error) {
    return { error: "Something went wrong", success: "" };
  }
};

export const deleteFaculty = async (id: string): Promise<ReturnProps> => {
  try {
    const { facultyName } = await prisma.faculty.delete({ where: { id: id } });
    revalidatePath("/admin/dept");
    return { error: "", success: `${facultyName} delete successfully` };
  } catch (err) {
    return { error: "Something went wrong", success: "" };
  }
};
