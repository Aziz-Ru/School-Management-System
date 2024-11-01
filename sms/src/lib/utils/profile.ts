"use server";

import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { Status, TAttendence, TeacherProfile, TSchedule } from "./types";

type ProfileDataResponse = {
  tProfile?: TeacherProfile;
  tSchedule?: TSchedule[];
  tAttendence?: TAttendence[];
  status: Status;
};

export const getProfileData = async (): Promise<ProfileDataResponse> => {
  
  const cookie_uid = cookies().get("__u_id")?.value;
  const uid = cookie_uid ? parseInt(cookie_uid as string) : null;

  if (!uid || isNaN(uid)) {
    return { status: Status.UNAUTHORIZED };
  }

  const date = new Date();

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
};
