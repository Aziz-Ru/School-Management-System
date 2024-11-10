"use server";

import prisma from "@/lib/db";
import { Course, Status } from "./types";
type CourseReturnProps = {
  courses?: Course[];
  status: Status;
};
// get all courses
export const getCourses = async (): Promise<CourseReturnProps> => {
  try {
    const courses = await prisma.course.findMany({
      select: {
        courseName: true,
        mark: true,
        _count: {
          select: {
            teachers: true,
          },
        },
      },
    });

    return { courses, status: Status.OK };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};
