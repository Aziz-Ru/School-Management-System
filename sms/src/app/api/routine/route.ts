import { DaysOfWeek, Times } from "@/lib/data";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const sectionId = searchParams.get("sectionId");
  const id = searchParams.get("classId");

  const admin = searchParams.get("admin");

  if (!sectionId || !id || (id && isNaN(parseInt(id)))) {
    return NextResponse.json(
      { error: "SectionId and ClassId is required" },
      { status: 400 }
    );
  }

  const classId = id ? parseInt(id) : 0;
  const level = classId < 6 ? "PRIMARY" : "SCHOOL";

  try {
    const [schedule, subjects, teachers] = await prisma.$transaction([
      prisma.schedule.findMany({
        where: {
          sectionId: sectionId,
        },
        select: {
          id: true,
          startEnd: true,
          teacher: {
            select: {
              fullName: true,
            },
          },
          subject: {
            select: {
              courseName: true,
            },
          },
        },
      }),
      prisma.subject.findMany({
        where: { classId },
        select: { id: true, courseName: true },
      }),
      prisma.teacher.findMany({
        where: { level },
        select: {
          id: true,
          fullName: true,
          courses: { select: { courseName: true } },
        },
      }),
    ]);

    const routine = Times.map((t) => {
      const obj: any = { time: t.time };
      const days = DaysOfWeek.map((day) => {
        const daySchedule = schedule.find((s) => s.startEnd === t.time);
        if (daySchedule) {
          obj[day] = `${daySchedule.subject!.courseName}`;
        } else {
          obj[day] = "";
        }
      });
      return { ...obj, ...days };
    });
    if (admin) {
      return NextResponse.json(
        { data: { routine, subjects, teachers } },
        { status: 200 }
      );
    }
    return NextResponse.json({ data: { routine } }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: "Server side Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { sectionId, teacherId, startEnd, subjectId } = await req.json();
  try {
    const schedule = await prisma.schedule.findFirst({
      where: {
        sectionId: sectionId,
        startEnd: startEnd,
      },
    });
    if (schedule) {
      return NextResponse.json(
        { error: "Schedule Already Exist" },
        { status: 400 }
      );
    }
    await prisma.schedule.create({
      data: {
        sectionId: sectionId,
        teacherId: parseInt(teacherId),
        startEnd: startEnd,
        subjectId: subjectId,
      },
    });
    revalidatePath("/dashboard");
    return NextResponse.json(
      { msg: "Schedule Added Successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: "Server side Error" }, { status: 500 });
  }
}
