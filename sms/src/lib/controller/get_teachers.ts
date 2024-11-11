"use server";

import prisma from "../db";
import { Status, Subject, User, UserRole } from "../types";

type GetTeachersReturnProps = {
  teachers?: User[];
  subjects?: Subject[];
  status: Status;
};

type FilterOptions = {
  q?: string;
  subject?: string;
  level?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};
export const get_teachers = async (
  filters: FilterOptions
): Promise<GetTeachersReturnProps> => {
  try {
    const {
      q = "",
      subject,
      level,
      status,
      sortBy = "teacherProfile.last_name",
      sortOrder = "asc",
      page = 1,
      limit = 10,
    } = filters;
    const where = {
      role: UserRole.TEACHER,
      AND: [] as any[],
    };

    if (q) {
      where.AND.push({
        OR: [
          {
            teacherProfile: {
              OR: [
                { first_name: { contains: q } },
                { last_name: { contains: q } },
              ],
            },
          },
          {
            email: { contains: q },
          },
        ],
      });
    }

    const [teachers, subjects] = await prisma.$transaction([
      prisma.user.findMany({
        where: where,

        select: {
          id: true,
          email: true,
          sex: true,
          status: true,
          lastLogin: true,
          phone: true,
          role: true,
          address: true,
          teacherProfile: {
            select: {
              first_name: true,
              last_name: true,
              teacher_id: true,
              degrees: true,
              level: true,

              subject: {
                select: {
                  subject_id: true,
                  subject_name: true,
                  subject_code: true,
                },
              },
            },
          },
        },
      }),
      prisma.subject.findMany(),
    ]);

    return { teachers, subjects, status: Status.OK };
  } catch (error) {
    console.log(error);
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};
