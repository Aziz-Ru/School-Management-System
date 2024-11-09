"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const scheduleSchema = z.object({
  sectionId: z
    .string({
      required_error: "sectionId must be required",
      invalid_type_error: "sectionId must be a String",
    })
    .uuid("sectionId must be a valid id"),
  teacherId: z
    .number({
      required_error: "teacherId must be required",
      invalid_type_error: "teacherId must be a Number",
    })
    .int()
    .min(1000, "teacherId must be a number greater than 1000"),
  subjectId: z
    .string({
      required_error: "subjectId must be required",
      invalid_type_error: "subjectId must be a String",
    })
    .uuid("subjectId must be a valid id"),
  day: z.enum(
    ["SUNDAY", "SATURDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY"],
    { errorMap: () => ({ message: "Invalid Day" }) }
  ),
  startEnd: z.enum(
    [
      "8:00 - 9:00 AM",
      "9:00 - 10:00 AM",
      "10:00 - 11:00 AM",
      "11:00 - 12:00 PM",
      "12:00 - 1:00 PM",
      "1:00 - 2:00 PM",
      "2:00 - 3:00 PM",
      "3:00 - 4:00 PM",
    ],
    { errorMap: () => ({ message: "Invalid StartEnd" }) }
  ),
});

interface ReturnProps {
  error?: string;
  msg?: string;
}

export const createRoutine = async (
  formData: FormData
): Promise<ReturnProps> => {
  try {
    console.log(formData.get("startEnd"));
    const validResult = scheduleSchema.safeParse({
      sectionId: formData.get("sectionId"),
      teacherId: parseInt(formData.get("teacherId") as string),
      subjectId: formData.get("subjectId"),
      startEnd: formData.get("hour"),
      day: formData.get("day"),
    });
    if (!validResult.success) {
      return { error: validResult.error.errors[0].message };
    }
    const [schedule, isBusyTeacher] = await prisma.$transaction([
      prisma.schedule.findFirst({
        where: {
          sectionId: validResult.data.sectionId,
          day: validResult.data.day,
          startEnd: validResult.data.startEnd,
        },
      }),
      prisma.schedule.findFirst({
        where: {
          teacherId: validResult.data.teacherId,
          startEnd: validResult.data.startEnd,
          day: validResult.data.day,
        },
      }),
    ]);
    if (schedule) {
      return {
        error: `Schedule already exist at ${validResult.data.startEnd}`,
      };
    }
    if (isBusyTeacher) {
      return {
        error: `Teacher is already busy at ${validResult.data.startEnd}`,
      };
    }

    await prisma.schedule.create({
      data: {
        day: validResult.data.day,
        sectionId: validResult.data.sectionId,
        teacherId: validResult.data.teacherId,
        startEnd: validResult.data.startEnd,
        subjectId: validResult.data.subjectId,
      },
    });
    revalidatePath("/dashboard");
    return { msg: "Schedule Added Successfully" };
  } catch (error: any) {
    console.log(error.message);
    return { error: "Failed to add Schedule" };
  }
};
