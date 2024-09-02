"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const handleSection = async (formData) => {
  console.log(formData.get("sectionName"));
  console.log(formData.get("classId"));
  console.log(formData.get("year"));
  await prisma.section.create({
    data: {
      sectionName: formData.get("sectionName"),
      year: formData.get("year"),
      classId: parseInt(formData.get("classId")),
    },
  });
  revalidatePath("/admin/section");
};
