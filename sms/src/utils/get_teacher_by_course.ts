"use server";

import prisma from "../lib/db";
import { Status, TeacherProfile } from "./types";

interface ReturnProps {
  teachers?: TeacherProfile[];
  status: Status;
}

export async function get_teacher_by_course(
  course_name: string
): Promise<ReturnProps> {
  try {
    const teachers = await prisma.teacher.findMany({
      where: {
        courses: {
          some: {
            courseName: course_name,
          },
        },
      },
      select: {
        fullName: true,
        email: true,
        courses: {
          select: {
            courseName: true,
          },
        },
        id: true,
        phone: true,
        img: true,
        level: true,
        rank: true,
      },
    });
    if (teachers.length === 0) {
      return { status: Status.NOT_FOUND };
    }
    return { teachers, status: Status.OK };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
}
