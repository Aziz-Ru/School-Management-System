import prisma from "@/lib/db";
import { Status, Subject } from "./types";

type ReturnProps = {
  subjects?: Subject[];
  status: Status;
};

export const getTeacherEnrolledCourse = async (teacherId: number) => {
  try {
    
    const schedules = await prisma.schedule.findMany({
      where: {
        teacherId: teacherId,
      },
      distinct: ["subjectId"],
      select: {
        section: {
          select: {
            id: true,
            sectionName: true,
            classId: true,
            year: true,
          },
        },
        subject: {
          select: {
            id: true,
            courseName: true,
            classId: true,
          },
        },
      },
    });

    const subjects = schedules.map((schedule) => {
      return {
        id: schedule.subject.id,
        courseName: schedule.subject.courseName,
        classId: schedule.subject.classId,
        sectionId: schedule.section.id,
        sectionName: schedule.section.sectionName,
        year: schedule.section.year,
      };
    });
    return { subjects, status: Status.OK };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};
