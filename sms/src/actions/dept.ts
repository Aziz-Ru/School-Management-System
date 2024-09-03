"use server";

import prisma from "@/lib/db";
import { deptScheam } from "@/lib/schema/Schema";
import { revalidatePath } from "next/cache";

interface ReturnProps {
  error: string;
  success: string;
}

export const getDept = async (formdata: FormData) => {
  try {
    const facultyName = formdata.get("facultyName") as string;
    const faculties = await prisma.department.findMany({
      where: { deptName: { startsWith: facultyName } },
    });
    return faculties;
  } catch (error) {
    return [];
  }
};

export const addDept = async (formdata: FormData): Promise<ReturnProps> => {
  try {
    const resut = deptScheam.safeParse({
      deptName: formdata.get("deptName") as string,
      facultyId: formdata.get("facultyId") as string,
    });
    if (!resut.success) {
      const err = resut.error.issues[0].message;
      return { error: err, success: "" };
    }
    const existingDept = await prisma.department.findFirst({
      where: { deptName: resut.data.deptName as string },
    });
    if (existingDept) {
      return { error: "Department already exists", success: "" };
    }

    await prisma.department.create({
      data: {
        facultyId: resut.data.facultyId as string,
        deptName: resut.data.deptName as string,
      },
    });
    revalidatePath("/admin/dept");
    return { error: "", success: "Department added successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong", success: "" };
  }
};

export const deleteDept = async (id: string): Promise<ReturnProps> => {
  try {
    const { deptName } = await prisma.department.delete({
      where: { id: id },
    });
    revalidatePath("/admin/dept");
    return { error: "", success: `${deptName} delete successfully` };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong", success: "" };
  }
};
