"use server";

import prisma from "@/lib/db";
import { deptScheam } from "@/lib/schema/Schema";
import { revalidatePath } from "next/cache";

interface ReturnProps {
  error?: string;
  msg?: string;
}

// export const getDept = async (formdata: FormData) => {
//   try {
//     const deptName = formdata.get("deptName") as string;
//     const faculties = await prisma.department.findMany({
//       where: { deptName: { startsWith: deptName } },
//     });
//     return faculties;
//   } catch (error) {
//     return [];
//   }
// };

export const addDept = async (formdata: FormData): Promise<ReturnProps> => {
  try {
    const resut = deptScheam.safeParse({
      deptName: formdata.get("deptName") as string,
      facultyId: formdata.get("facultyId") as string,
    });
    if (!resut.success) {
      const err = resut.error.issues[0].message;
      return { error: err };
    }
    const existingDept = await prisma.department.findFirst({
      where: { deptName: resut.data.deptName as string },
    });
    if (existingDept) {
      return { error: "Department already exists" };
    }

    await prisma.department.create({
      data: {
        facultyId: resut.data.facultyId as string,
        deptName: resut.data.deptName as string,
      },
    });
    revalidatePath("/list/depts");
    return { msg: "Department added successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

// export const deleteDept = async (id: string): Promise<ReturnProps> => {
//   try {
//     const { deptName } = await prisma.department.delete({
//       where: { id: id },
//     });
//     revalidatePath("/admin/dept");
//     return { error: "", success: `${deptName} delete successfully` };
//   } catch (err) {
//     console.log(err);
//     return { error: "Something went wrong", success: "" };
//   }
// };
