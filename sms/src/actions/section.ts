"use server";

import prisma from "@/lib/db";
import { sectionSchema } from "@/lib/schema/Schema";
import { revalidatePath } from "next/cache";

interface ReturnProps {
  error?: string;
  success?: string;
}

export const addSection = async (
  formData: FormData,
  classId: string
): Promise<ReturnProps> => {
  const result = sectionSchema.safeParse({
    sectionName: formData.get("sectionName") as string,
    year: new Date().getFullYear(),
    classId: classId,
  });

  if (!result.success) {
    const error = result.error.issues[0].message;
    return { error: error };
  }

  const existSection = await prisma.section.findFirst({
    where: {
      sectionName: `${result.data.sectionName}`,
      year: `${result.data.year}`,
      classId: `${result.data.classId}`,
    },
  });

  if (existSection) {
    return { error: "Section already exists" };
  }

  await prisma.section.create({
    data: {
      sectionName: `${result.data.sectionName}`,
      year: `${result.data.year}`,
      classRoom: { connect: { id: result.data.classId } },
    },
  });
  revalidatePath("/admin/section");
  revalidatePath("/admin/class");
  return { success: "Section added successfully" };
};

interface Section {
  id: string;
  sectionName: string;
  year: string;
  classRoom: {
    id: string;
    className: string;
    classId: number;
  };
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
      select: {
        id: true,
        sectionName: true,
        year: true,
        classRoom: true,
      },
    });
  } catch (error) {
    return [];
  }
};

export const deleteSection = async (id: string): Promise<ReturnProps> => {
  try {
    const section = await prisma.section.delete({
      where: {
        id,
      },
    });
    revalidatePath("/admin/section");
    revalidatePath("/admin/class");
    return {
      success: `${section.sectionName} deleted successfully`,
    };
  } catch (error) {
    return { error: "Failed to delete" };
  }
};
