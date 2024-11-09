import prisma from "@/lib/db";
import { Class, Status, Subject } from "./types";

type ExamReturnProps = {
  classData?: Class[];
  subjects?: Subject[];
  status: Status;
};

export const getExams = async (): Promise<ExamReturnProps> => {
  try {
    const [classData, subjects] = await prisma.$transaction([
      prisma.class.findMany({
        select: {
          id: true,
          className: true,
          sections: { select: { id: true, sectionName: true } },
        },
      }),
      prisma.subject.findMany({
        select: {
          id: true,
          courseName: true,
          classId: true,
        },
      }),
    ]);
    return { classData, subjects, status: Status.OK };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};
