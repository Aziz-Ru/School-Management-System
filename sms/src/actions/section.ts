"use server";

import prisma from "@/lib/db";
import { sectionSchema } from "@/lib/schema/Schema";
import { revalidatePath } from "next/cache";

type ValidationErrors = {
  path: string;
  msg: string;
}[];

type State = {
  errors?: ValidationErrors;
  success?: string;
};

export const addSection = async (formData: FormData): Promise<State> => {
  const result = sectionSchema.safeParse({
    sectionName: formData.get("sectionName") as string,
    year: Number(formData.get("year")),
    classId: Number(formData.get("classId")),
  });

  if (!result.success) {
    const errors: ValidationErrors = result.error.issues.map((issue) => {
      const path = issue.path.join(".");
      return {
        path,
        msg: issue.message,
      };
    });
    return { errors };
  }

  const existSection = await prisma.section.findFirst({
    where: {
      sectionName: `${result.data.sectionName}`,
      year: `${result.data.year}`,
      classId: `${result.data.classId}`,
    },
  });

  if (existSection) {
    return { errors: [{ path: "section", msg: "Section already exist" }] };
  }

  await prisma.section.create({
    data: {
      sectionName: `${result.data.sectionName}`,
      year: `${result.data.year}`,
      classId: `${result.data.classId}`,
    },
  });
  revalidatePath("/admin/section");
  return { success: "Section added successfully" };
};

interface Section {
  id: string;
  sectionName: string;
  year: string;
  classId: string;
}

export const getSection = async (formData: FormData): Promise<Section[]> => {
  try {
    const classId = formData.get("classId");
    const year = formData.get("year");
    const sectionName = formData.get("sectionName");
    return await prisma.section.findMany({
      where: {
        sectionName: {
          startsWith: (sectionName as string) || undefined,
        },
        year: (year as string) || undefined,
        classId: (classId as string) || undefined,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    return [];
  }
};

type deleteProps = {
  success: string;
  error: string;
};

export const deleteSection = async (id: string): Promise<deleteProps> => {
  try {
    
    const section = await prisma.section.delete({
      where: {
        id,
      },
    });
    revalidatePath("/admin/section");
    return {
      success: `${section.sectionName} deleted successfully`,
      error: "",
    };
  } catch (error) {
    return { error: "Failed to delete", success: "" };
  }
};
