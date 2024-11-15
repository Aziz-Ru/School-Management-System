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
      timeslot_id: formData.get("timeslot_id") as string,
    });
    if (!validResult.success) {
      return { error: validResult.error.errors[0].message };
    }
    const [isRoutineExist, isSectionSubjectExist] = await prisma.$transaction([
      prisma.section_subject_schedule.findUnique({
        where: {
          subject_name_section_id_timeslot_id: {
            subject_name: validResult.data.subject_name,
            section_id: validResult.data.section_id,
            timeslot_id: validResult.data.timeslot_id,
          },
        },
        select: {
          timeslots: {
            select: {
              start_time: true,
              end_time: true,
            },
          },
        },
      }),
      prisma.section_subject.findUnique({
        where: {
          subject_name_section_id: {
            subject_name: validResult.data.subject_name,
            section_id: validResult.data.section_id,
          },
        },
      }),
    ]);

    if (isRoutineExist) {
      return {
        error: `Schedule already exist at ${isRoutineExist.timeslots.start_time} - ${isRoutineExist.timeslots.end_time}`,
      };
    }
    if (!isSectionSubjectExist) {
      return { error: "Subject not found" };
    }

    await prisma.section_subject_schedule.create({
      data: {
        subject_name: validResult.data.subject_name,
        section_id: validResult.data.section_id,
        timeslot_id: validResult.data.timeslot_id,
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
