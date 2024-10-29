"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

interface ReturnProps {
  error?: string;
  msg?: string;
}

interface inputProps {
  formData: FormData;
}

export const selectCourseAction = async (
  formData: FormData
): Promise<ReturnProps> => {
  try {
    const subject = formData.get("course");
    const Id = formData.get("classId");
    if (!subject || !Id) {
      return { error: "Please Select Course" };
    }
    const subjects = subject!.toString().split(",");
    const classId = parseInt(Id as string);
    // Check if course already exist
    const existingCourse = await prisma.subject.findMany({
      where: {
        classId: classId,
        id: { in: subjects.map((CID) => CID) },
      },
    });
    if (existingCourse.length > 0) {
      return { error: "Course already exist" };
    }
    // Add course to database
    const subjectData = subjects.map((CID) => ({
      id: uuidv4(),
      classId: classId,
      courseName: CID,
    }));

    await prisma.subject.createMany({
      data: subjectData,
    });
    const section = await prisma.section.findMany({
      where: { classId: classId },
      select: {
        id: true,
        subjects: { select: { id: true } },
      },
    });

    if (section.length > 0) {
      const sectionSubjects = section.map((sect) => {
        return subjectData.map((sub) => ({
          id: uuidv4(),
          sectionId: sect.id,
          subjectId: sub.id,
        }));
      });
      await prisma.sectionSubject.createMany({
        data: sectionSubjects.flat(),
      });
    }

    revalidatePath("/dashboard");
    return { msg: "Course added successfully" };
  } catch (error: any) {
    return { error: "Something went wrong" };
  }
};

export const deleteCourseAction = async (id: string): Promise<ReturnProps> => {
  try {
    await prisma.course.delete({
      where: {
        courseName: id,
      },
    });
    revalidatePath("list/cls");
    return { msg: "Course deleted successfully" };
  } catch (error: any) {
    return { error: "Something went wrong" };
  }
};
