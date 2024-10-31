"use server";

import prisma from "@/lib/db";
import { facultySchema } from "@/lib/schema/Schema";
import { revalidatePath } from "next/cache";

interface ReturnProps {
  error?: string;
  msg?: string;
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
      return { error: err };
    }
    const existingFaculty = await prisma.faculty.findFirst({
      where: { facultyName: resut.data.facultyName },
    });

    if (existingFaculty) {
      return { error: "Faculty already exists" };
    }

    await prisma.faculty.create({
      data: {
        facultyName: resut.data.facultyName as string,
      },
    });
    
    revalidatePath("/list/depts");
    return { msg: "Faculty added successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

(err.code);
    if (err.code === "P2003") {
      console.log("error");
      return {
        error:
          "This faculty has some department ,so you need to delete those departments ",
        success: "",
      };
    } else {
      return { error: "Something went wrong", success: "" };
    }

    // return { error: "Something went wrong", success: "" };
  }
};

