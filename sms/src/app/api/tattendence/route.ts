import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { teacherId, date, isPresent } = await req.json();
    // Save the attendance in the database
    if (
      !teacherId ||
      !date ||
      isPresent === undefined ||
      (teacherId && isNaN(teacherId))
    ) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    prisma.teacherAttendence.create({
      data: {
        teacherId: parseInt(teacherId),
        date: new Date(date),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to mark attendance" },
      { status: 500 }
    );
  }
}
