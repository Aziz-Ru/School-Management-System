"use server";

import prisma from "@/lib/db";
import { sectionSchema } from "@/lib/schema/Schema";
import { revalidatePath } from "next/cache";

interface ReturnProps {
  error?: string;
  msg?: string;
}

interface inputProps {
  formData: FormData;
}

export const addSectionAction = async (
  formData: FormData
): Promise<ReturnProps> => {
  const currentYear = new Date().getFullYear();
  const teacherId = formData.get("teacherId");
  const result = sectionSchema.safeParse({
    sectionName: formData.get("sectionName") as string,
    year: currentYear,
    classId: parseInt(formData.get("id") as string),
  });

  if (!result.success) {
    const error = result.error.issues[0].message;
    return { error: error };
  }
  const [existSection, isTeacherEnrolled, numOfSection] =
    await prisma.$transaction([
      prisma.section.findFirst({
        where: {
          sectionName: `${result.data.sectionName}`,
          year: Number(result.data.year),
          classId: result.data.classId,
        },
      }),
      prisma.section.findFirst({
        where: { sectionTeacherId: teacherId as string, year: currentYear },
      }),
      prisma.section.count(),
    ]);

  if (existSection) {
    return {
      error:
        "Either Section Name Already Exists or Teacher Already Enrolled A Section ",
    };
  }
  if (isTeacherEnrolled) {
    return { error: "Teacher Already Enrolled A Section" };
  }

  await prisma.section.create({
    data: {
      index: numOfSection + 1,
      sectionName: `${result.data.sectionName}`,
      year: Number(result.data.year),
      classTable: { connect: { id: result.data.classId } },
      sectionTeacher: {
        connect: {
          id: teacherId as string,
        },
      },
    },
  });
  revalidatePath("/list/cls");
  return { msg: "Section added successfully" };
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

// export const getSection = async (formData: FormData): Promise<Section[]> => {
//   try {
//     const classId = formData.get("classId");
//     const year = formData.get("year");
//     const sectionName = formData.get("sectionName");
//     return await prisma.section.findMany({
//       where: {
//         sectionName: {
//           startsWith: (sectionName as string) || undefined,
//         },
//         year: (year as string) || undefined,
//         classId: (classId as string) || undefined,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//       select: {
//         id: true,
//         sectionName: true,
//         year: true,
//         classRoom: true,
//       },
//     });
//   } catch (error) {
//     return [];
//   }
// };

// export const deleteSection = async (id: string): Promise<ReturnProps> => {
//   try {
//     const section = await prisma.section.delete({
//       where: {
//         id,
//       },
//     });
//     revalidatePath("/admin/section");
//     revalidatePath("/admin/class");
//     return {
//       success: `${section.sectionName} deleted successfully`,
//     };
//   } catch (error) {
//     return { error: "Failed to delete" };
//   }
// };

export const deleteSectionAction = async (id: string): Promise<ReturnProps> => {
  try {
    await prisma.section.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/list/cls");
    return { msg: "Deleted successfully" };
  } catch (error) {
    return { error: "Failed to delete" };
  }
};
