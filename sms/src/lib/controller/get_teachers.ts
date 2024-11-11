"use server";

import prisma from "../db";
import { Status, Subject, User } from "../types";

type GetTeachersReturnProps = {
  teachers?: User[];
  subjects?: Subject[];
  status: Status;
};

export const get_teachers = async (): Promise<GetTeachersReturnProps> => {
  try {
    const [teachers, subjects] = await prisma.$transaction([
      prisma.user.findMany({
        where: { role: "TEACHER" },
        select: {
          id: true,
          email: true,
          sex: true,
          status: true,
          lastLogin: true,
          phone: true,
          role: true,
          teacherProfile: {
            select: {
              first_name: true,
              last_name: true,
              teacher_id: true,
            },
          },
        },
      }),
      prisma.subject.findMany(),
    ]);
    return { teachers, subjects, status: Status.OK };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};
