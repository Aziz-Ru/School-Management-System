"use server";

import prisma from "@/lib/db";

type ReturnProps = {
  error?: string;
  msg?: string;
};
export const createExam = async (formData: FormData): Promise<ReturnProps> => {
  const id = formData.get("classId");
  const dates = JSON.parse(formData.get("dates") as string);
  const classId = parseInt(id as string);
  if (isNaN(classId) || classId < 1 || classId > 10) {
    return {
      error: "Please select a class",
    };
  }
  console.log(dates);
  const [sections, subjects] = await prisma.$transaction([
    prisma.section.findMany({
      where: {
        classId: classId,
        year: new Date().getFullYear(),
      },
      select: {
        id: true,
      },
    }),
    prisma.subject.findMany({
      where: {
        classId: classId,
      },
      select: {
        id: true,
      },
    }),
  ]);

  const isMatchSubjectIds = dates.map((date: any) => {
    return subjects.find((sub) => sub.id == date.id);
  });

  console.log(isMatchSubjectIds);

  return {
    msg: "Exam created successfully",
  };
};
