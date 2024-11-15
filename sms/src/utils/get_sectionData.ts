import prisma from "@/lib/db";
import {
  Attendence,
  Schedule,
  Section,
  Status,
  Student,
  Subject,
  Teacher,
} from "./types";

type ReturnProps = {
  section?: Section;
  students?: Student[];
  subjects?: Subject[];
  teachers?: Teacher[];
  schedules?: Schedule[];
  status: Status;
};

export const getSectionData = async (
  sectionId: string,
  date: Date
): Promise<ReturnProps> => {
  try {
    const section = await prisma.section.findUnique({
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
        classId: true,
      },
    });
    if (!section) {
      return { status: Status.NOT_FOUND };
    }
    const level = section?.classId! < 6 ? "PRIMARY" : "SCHOOL";

    const [students, subjects, teachers, schedules] = await prisma.$transaction(
      [
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
        prisma.subject.findMany({ where: { classId: section.classId } }),
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
      ]
    );

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

interface SectionReturnProps {
  section?: Section;
  students?: Student[];
  status: Status;
  attendance?: Attendence[];
}
export const getSection = async (
  sectionId: string
): Promise<SectionReturnProps> => {
  try {
    const [section, students, attendance] = await prisma.$transaction([
      prisma.section.findUnique({
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
          classId: true,
          year: true,
        },
      }),
      prisma.student.findMany({
        where: { sectionId: sectionId },
        select: { id: true, fullName: true },
      }),
      prisma.attendence.findMany({
        where: {
          sectionId: sectionId,
        },
      }),
    ]);

    if (!section) {
      return { status: Status.NOT_FOUND };
    }

    return {
      section,
      students,
      attendance,
      status: Status.OK,
    };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};

interface SectionStudentsReturnProps {
  students?: Student[];
  status: Status;
}


interface SectionRoutineReturnProps {
  subjects?: Subject[];
  teachers?: Teacher[];
  schedules?: Schedule[];
  status: Status;
}

export const getSectionRoutine = async (
  sectionId: string
): Promise<SectionRoutineReturnProps> => {
  try {
    const section = await prisma.section.findUnique({
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
        classId: true,
        year: true,
      },
    });
    if (!section) {
      return { status: Status.NOT_FOUND };
    }

    const level = section?.classId! < 6 ? "PRIMARY" : "SCHOOL";

    const [subjects, teachers, schedules] = await prisma.$transaction([
      prisma.subject.findMany({ where: { classId: section?.classId } }),
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
          day: true,
        },
      }),
    ]);

    return { subjects, teachers, schedules, status: Status.OK };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};
