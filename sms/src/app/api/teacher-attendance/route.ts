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
    current.setHours(0, 0, 0, 0);
    if (current.toDateString().split(" ")[0] === "Fri") {
      return NextResponse.json(
        { error: "You can't mark attendance on Friday" },
        { status: 400 }
      );
    }
    await prisma.teacher_attendance.create({
      data: {
        teacherId: parseInt(teacherId),
        date: current.toISOString(),
        status: "PRESENT",
      },
    });
    revalidatePath("/dashboard/attendance");
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
  current.setHours(0, 0, 0, 0);
  try {
    await prisma.teacher_attendance.delete({
      where: {
        teacherId_date: {
          teacherId: parseInt(teacherId),
          date: current.toISOString(),
        },
      },
    });
    return NextResponse.json({ data: { msg: `${teacherId} unmarked` } });
  } catch (error) {
    return NextResponse.json({ data: { err: `Failed to Unmark` } });
  }
}
