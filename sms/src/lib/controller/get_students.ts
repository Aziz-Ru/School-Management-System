"use server";

import { FilterOptions } from "@/utils/types";
import prisma from "../db";
import { Classes, Status, User } from "../types";

type GetStudentReturnProps = {
  students?: User[];
  classes?: Classes[];
  status: Status;
};

export const get_students = async (
  filters: FilterOptions
): Promise<GetStudentReturnProps> => {
  try {
    const [students, classes] = await prisma.$transaction([
      prisma.user.findMany({
        where: {
          role: "STUDENT",
          studentProfile: {
            first_name: {
              contains: filters.q,
            },
          },
        },
        select: {
          id: true,
          email: true,
          lastLogin: true,
          address: true,
          img: true,
          phone: true,
          sex: true,
          studentProfile: {
            select: {
              student_id: true,
              first_name: true,
              last_name: true,
              section: {
                select: {
                  section_id: true,
                  section_name: true,
                  academic_year: true,
                  room_number: true,
                },
              },
            },
          },
        },
      }),
      prisma.classes.findMany({
        where: {
          sections: {
            some: {
              academic_year: new Date().getFullYear(),
            },
          },
        },
        select: {
          class_id: true,
          class_name: true,
          sections: {
            select: {
              section_name: true,
              section_id: true,
              academic_year: true,
              room_number: true,
            },
          },
        },
      }),
    ]);

    console.log(students);
    return {
      students,
      classes,
      status: Status.OK,
    };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};
