import prisma from "@/lib/db";
import { decrypt } from "@/session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = cookies().get("__session")?.value;
  if (session == null) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { user } = await decrypt(session);
  if (user == null) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
        year: current.getFullYear(),
        month: current.getMonth() + 1,
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
  const session = cookies().get("__session")?.value;
  if (session == null) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { user } = await decrypt(session);
  if (user == null) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
