import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { date, studentId, sectionId } = await req.json();
  console.log(date, studentId);
  try {
    await prisma.attendence.create({
      data: {
        date: date,
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
        studentId_date: {
          studentId: parseInt(studentId),
          date: new Date(date),
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
