import prisma from "../db";
import { Notice, Status, StudentAttendance, TeacherAttendance } from "../types";

type DasboardRetrunProps = {
  teacherAttendance?: TeacherAttendance[];
  studentAttendance?: StudentAttendance[];
  notices?: Notice[];
  teacherCount?: number;
  studentCount?: number;
  status: Status;
};

export async function get_dashboard(): Promise<DasboardRetrunProps> {
  try {
    const today = new Date();

    const [
      teacherAttendance,
      studentAttendance,
      notices,
      teacherCount,
      studentCount,
    ] = await prisma.$transaction([
      prisma.teacher_attendance.findMany({
        where: {
          year: today.getFullYear(),
        },
        select: {
          id: true,
          teacherId: true,
          date: true,
          month: true,
          year: true,
          status: true,
        },
      }),
      prisma.student_attendance.findMany({
        where: {
          year: today.getFullYear(),
        },
        select: {
          id: true,
          student_id: true,
          month: true,
          year: true,
          sectionId: true,
          status: true,
          date: true,
        },
      }),
      prisma.notice.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),
      prisma.user.count({ where: { status: "ACTIVE", role: "TEACHER" } }),
      prisma.user.count({ where: { status: "ACTIVE", role: "STUDENT" } }),
    ]);

    return {
      teacherAttendance,
      studentAttendance,
      notices,
      teacherCount,
      studentCount,
      status: Status.OK,
    };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
}
