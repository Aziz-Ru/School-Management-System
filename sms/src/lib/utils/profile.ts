"use server";

import prisma from "@/lib/db";
import { decrypt } from "@/session";
import { cookies } from "next/headers";
import { Status, TAttendence, TeacherProfile, TSchedule } from "./types";

type ProfileDataResponse = {
  tProfile?: TeacherProfile;
  tSchedule?: TSchedule[];
  tAttendence?: TAttendence[];
  status: Status;
};

export const getProfileData = async (): Promise<ProfileDataResponse> => {
  const session = cookies().get("__session")?.value;
  if (!session) {
    return { status: Status.UNAUTHORIZED };
  }
  const { user } = await decrypt(session);
  if (!user) {
    return { status: Status.UNAUTHORIZED };
  }

  const uid = user.id ? parseInt(user.id as string) : null;

  if (!uid || isNaN(uid)) {
    return { status: Status.UNAUTHORIZED };
  }
  const date = new Date();
  if (user.role === "TEACHER") {
    const [teacher, tschedule, tattendence] = await prisma.$transaction([
      prisma.teacher.findUnique({
        where: {
          id: uid,
        },
        select: {
          id: true,
          fullName: true,
          phone: true,
          img: true,
          email: true,
        },
      }),
      prisma.schedule.findMany({
        where: {
          teacherId: uid,
        },
        select: {
          startEnd: true,
          subject: {
            select: {
              courseName: true,
            },
          },
          section: {
            select: {
              sectionName: true,
              classId: true,
            },
          },
        },
      }),
      prisma.teacherAttendence.findMany({
        where: { teacherId: uid, year: date.getFullYear() },
      }),
    ]);

    if (!teacher) {
      return { status: Status.NOT_FOUND };
    }

    return {
      tProfile: teacher,
      tSchedule: tschedule,
      tAttendence: tattendence,
      status: Status.OK,
    };
  }
  if (user.role === "STUDENT") {
    const [student, stSchedule, stAttendence] = await prisma.$transaction([
      prisma.student.findUnique({
        where: {
          id: uid,
        },
        select: {
          id: true,
          fullName: true,
          phone: true,
          img: true,
          section: {
            select: {
              sectionName: true,
              classId: true,
            },
          },
        },
      }),
      prisma.schedule.findMany({
        where: {
          sectionId: user.sectionId,
        },
      }),
      prisma.attendence.findMany({
        where: {
          studentId: uid,
          year: date.getFullYear(),
        },
      }),
    ]);
    return { status: Status.OK };
  }
  return { status: Status.UNAUTHORIZED };
};
