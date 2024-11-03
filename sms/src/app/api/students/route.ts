import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const classId = searchParams.get("classId");

    if (!classId || (classId && isNaN(parseInt(classId)))) {
      return NextResponse.json(
        { error: "ClassId is required" },
        { status: 400 }
      );
    }

    const students = await prisma.student.findMany({
      where: {
        section: {
          classId: {
            lte: parseInt(classId),
          },
        },
      },
      select: {
        id: true,
        fullName: true,
        lastExamStatus: true,
      },
    });

    return NextResponse.json({ data: students }, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
