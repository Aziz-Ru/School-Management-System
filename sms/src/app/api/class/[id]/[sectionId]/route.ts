import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { sectionId: string; id: string } }
) {
  try {
    const { sectionId, id } = params;
    const classId = parseInt(id);
    if (isNaN(classId) || classId < 1 || classId > 10) {
      notFound();
    }
    const level = classId < 6 ? "PRIMARY" : "SCHOOL";
    const [subjects, teachers] = await prisma.$transaction([
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
    return NextResponse.json({ data: { subjects, teachers } }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
