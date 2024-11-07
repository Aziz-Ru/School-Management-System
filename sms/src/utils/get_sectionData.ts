import prisma from "@/lib/db";
import { Schedule, Section, Status, Student, Subject, Teacher } from "./types";

type ReturnProps = {
  section?: Section;
  students?: Student[];
  subjects?: Subject[];
  teachers?: Teacher[];
  schedules?: Schedule[];
  status: Status;
};

export const getSectionData = async (
  classId: number,
  sectionId: string,
  date: Date
): Promise<ReturnProps> => {
  try {
    const level = classId < 6 ? "PRIMARY" : "SCHOOL";

    const [section, students, subjects, teachers, schedules] =
      await prisma.$transaction([
        prisma.section.findFirst({
          where: {
            id: sectionId,
          },
          select: {
            id: true,
            sectionName: true,
            sectionTeacher: {
              select: {
                id: true,
                fullName: true,
              },
            },
          },
        }),
        prisma.student.findMany({
          where: { sectionId: sectionId },
          select: {
            id: true,
            fullName: true,
            attendenceList: {
              where: {
                year: date.getFullYear(),
                date: {
                  gte: new Date(date.getFullYear(), date.getMonth(), 1),
                  lte: new Date(date.getFullYear(), date.getMonth() + 1, 0),
                },
              },
              select: {
                id: true,
                date: true,
                year: true,
                present: true,
                sectionId: true,
              },
            },
            sectionId: true,
          },
        }),
        prisma.subject.findMany({ where: { classId: classId } }),
        prisma.teacher.findMany({
          where: {
            level: level,
          },
          select: {
            id: true,
            fullName: true,
            courses: {
              select: {
                courseName: true,
              },
            },
          },
        }),
        prisma.schedule.findMany({
          where: {
            sectionId: sectionId,
          },
          select: {
            id: true,
            startEnd: true,
            subject: {
              select: {
                classId: true,
                courseName: true,
              },
            },
            teacher: {
              select: {
                id: true,
                fullName: true,
              },
            },
          },
        }),
      ]);

    if (!section) {
      return { status: Status.NOT_FOUND };
    }

    return {
      section,
      students,
      subjects,
      teachers,
      schedules,
      status: Status.OK,
    };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};
