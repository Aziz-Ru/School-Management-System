"use server";
import { revalidatePath } from "next/cache";
import prisma from "../db";
import { SectionSubjectScheduleSchema } from "../schema/schema";

interface ReturnProps {
  error?: string;
  msg?: string;
}

export const add_routine_action = async (
  formData: FormData
): Promise<ReturnProps> => {
  try {
    const validResult = SectionSubjectScheduleSchema.safeParse({
      subject_name: formData.get("subject_name") as string,
      section_id: formData.get("section_id") as string,
      teacher_id: parseInt(formData.get("teacher_id") as string),
      timeslot_id: formData.get("timeslot_id") as string,
    });
    if (!validResult.success) {
      return { error: validResult.error.errors[0].message };
    }
    const [existingSchedule, hasTeacherSchedule] = await prisma.$transaction([
      prisma.section_subject_schedule.findUnique({
        where: {
          subject_name_section_id_timeslot_id_teacher_id: {
            subject_name: validResult.data.subject_name,
            section_id: validResult.data.section_id,
            timeslot_id: validResult.data.timeslot_id,
            teacher_id: validResult.data.teacher_id,
          },
        },
      }),
      prisma.section_subject_schedule.findUnique({
        where: {
          timeslot_id_teacher_id_academic_year: {
            timeslot_id: validResult.data.timeslot_id,
            teacher_id: validResult.data.teacher_id,
            academic_year: new Date().getFullYear(),
          },
        },
      }),
    ]);

    if (existingSchedule) {
      await prisma.section_subject_schedule.delete({
        where: {
          schedule_id: existingSchedule.schedule_id,
        },
      });
    }

    if (
      hasTeacherSchedule &&
      hasTeacherSchedule?.section_id !== validResult.data.section_id
    ) {
      return { error: "Teacher already has a schedule in this timeslot" };
    }

    await prisma.section_subject_schedule.create({
      data: {
        subject_name: validResult.data.subject_name,
        section_id: validResult.data.section_id,
        timeslot_id: validResult.data.timeslot_id,
        teacher_id: validResult.data.teacher_id,
      },
    });

    revalidatePath(
      `/dashboard/sections/${validResult.data.section_id}/routine`
    );
    revalidatePath("/dashboard");

    return { msg: "Schedule Added Successfully" };
  } catch (error: any) {
    console.log(error.message);
    return { error: "Failed to add Schedule" };
  }
};
