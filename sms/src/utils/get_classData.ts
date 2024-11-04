import prisma from "@/lib/db";
import { Class, Course, Status, Subject, Teacher } from "./types";

type ReturnProps = {
  classdata?: Class;
  courses?: Course[];
  teachers?: Teacher[];
  subjects?: Subject[];
  status: Status;
};

export async function getClassData(classId: number): Promise<ReturnProps> {
  try {
    const level = classId < 6 ? "PRIMARY" : "SCHOOL";

    const [classData, subjects, teachers] = await prisma.$transaction([
      prisma.class.findFirst({
        where: { id: classId },
        include: {
          sections: {
            select: {
              id: true,
              sectionName: true,
              year: true,
              sectionTeacher: {
                select: {
                  id: true,
                  fullName: true,
                },
              },
              _count: {
                select: {
                  students: true,
                },
              },
            },
            orderBy: {
              year: "desc",
            },
          },
        },
      }),
      prisma.subject.findMany({
        where: { classId: classId },
        select: { id: true, courseName: true },
      }),
      prisma.teacher.findMany({
        where: { level },
        select: {
          id: true,
          fullName: true,
        },
      }),
    ]);

    if (!classData) {
      return { status: Status.NOT_FOUND };
    }

    const courses = await prisma.course.findMany({
      where: {
        NOT: {
          courseName: { in: subjects.map((data) => data.courseName) },
        },
      },
    });
    // console.log(courses);

    return {
      classdata: classData,
      subjects,
      courses,
      teachers,
      status: Status.OK,
    };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
}
