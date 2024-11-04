import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { studentId, sectionId } = await req.json();
  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);
  if (currentDate.toDateString().split(" ")[0] === "Fri") {
    return NextResponse.json(
      { error: "You can't mark attendance on Friday" },
      { status: 400 }
    );
  }
  console.log(studentId, sectionId);
  if (isNaN(parseInt(studentId))) {
    return NextResponse.json({ error: "Invalid Student ID" }, { status: 400 });
  }

  try {
    await prisma.attendence.create({
      data: {
        date: currentDate.toISOString(),
        student: {
          connect: {
            id: parseInt(studentId),
          },
        },
        present: true,
        section: {
          connect: {
            id: sectionId,
          },
        },
        month: currentDate.getMonth() + 1,
      },
    });
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
    const date = searchParams.get("date");
    const studentId = searchParams.get("studentId");
    const sectionId = searchParams.get("sectionId");

    if (!date || !studentId || !sectionId) {
      return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
    }

    await prisma.attendence.delete({
      where: {
        studentId_date_month: {
          studentId: parseInt(studentId),
          date: new Date(date),
          month: new Date(date).getMonth() + 1,
        },
      },
    });

    revalidatePath("/dashboard");

    return NextResponse.json({ msg: "Attendance Deleted" });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: "Server Side Error" }, { status: 500 });
  }
}
