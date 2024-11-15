import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { studentId, sectionId, markedById } = await req.json();

  const currentDate = new Date();
  currentDate.setHours(12, 0, 0, 0);
  if (currentDate.toDateString().split(" ")[0] === "Fri") {
    return NextResponse.json(
      { error: "You can't mark attendance on Friday" },
      { status: 400 }
    );
  }

  if (isNaN(parseInt(studentId)) || isNaN(parseInt(markedById))) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.student_attendance.create({
      data: {
        student_id: parseInt(studentId),
        sectionId: sectionId,
        date: currentDate.toISOString(),
        status: "PRESENT",
        markedById: parseInt(markedById),
      },
    });
    revalidatePath("/dashboard/sections");
    revalidatePath("/dashboard");

    return NextResponse.json({ msg: "Attendance Marked" });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: "Server Side Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const studentId = searchParams.get("studentId");

    if (isNaN(parseInt(studentId!))) {
      return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
    }

    const currentDate = new Date();
    currentDate.setHours(12, 0, 0, 0);
    await prisma.student_attendance.delete({
      where: {
        student_id_date: {
          student_id: parseInt(studentId!),
          date: currentDate.toISOString(),
        },
      },
    });

    revalidatePath("/dashboard/sections");
    revalidatePath("/dashboard");

    return NextResponse.json({ msg: "Attendance Deleted" });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: "Server Side Error" }, { status: 500 });
  }
}
