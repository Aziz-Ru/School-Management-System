import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { teacherId } = await req.json();
    // Save the attendance in the database
    if (!teacherId || (teacherId && isNaN(teacherId))) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const current = new Date();
    current.setUTCHours(0, 0, 0, 0);
    await prisma.teacherAttendence.create({
      data: {
        teacherId: parseInt(teacherId),
        present: true,
        month: current.getMonth() + 1,
        year: current.getFullYear(),
        date: current.toISOString(),
      },
    });
    revalidatePath("/dashboard");
    return NextResponse.json({
      data: { msg: `${teacherId} marked as Present` },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to mark attendance" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const teacherId = searchParams.get("teacherId");

  if (!teacherId) {
    return NextResponse.json({ error: "Invalid Request" });
  }
  const current = new Date();
  current.setUTCHours(0, 0, 0, 0);
  try {
    await prisma.teacherAttendence.delete({
      where: {
        teacherId_date_month: {
          teacherId: parseInt(teacherId),
          date: current.toISOString(),
          month: current.getMonth() + 1,
        },
      },
    });
    return NextResponse.json({ data: { msg: `${teacherId} unmarked` } });
  } catch (error) {
    return NextResponse.json({ data: { err: `Failed to Unmark` } });
  }
}
