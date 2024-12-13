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
    const { exam_id, data } = await req.json();

    const results = JSON.parse(data);
    await prisma.exam_result.deleteMany({
      where: {
        examId: exam_id,
      },
    });

    await prisma.$transaction([
      prisma.exam_result.createMany({
        data: results.map((res: any) => {
          const totalSubjects = Object.keys(res.marks).length;
          return {
            examId: exam_id,
            student_id: res.student_id,
            totalObtainedMarks: res.totalNumber,
            totalMarks: totalSubjects * 100,
            gpa: res.grade / (totalSubjects * 3),
          };
        }),
      }),
      prisma.exam.update({
        where: { id: exam_id },
        data: { publish_status: "PUBLISHED" },
      }),
    ]);
    revalidatePath("/dashboard/results");
    revalidatePath("/dashboard/exams");
    return NextResponse.json({ msg: "Exam Result Published" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to Publish Result" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = cookies().get("__session")?.value;
  if (session == null) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { user } = await decrypt(session);
  if (user == null) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { exam_id } = await req.json();
    await prisma.exam.update({
      where: { id: exam_id },
      data: { publish_status: "DRAFT" },
    });
    revalidatePath("/dashboard/results");
    revalidatePath("/dashboard/exams");
    return NextResponse.json({ msg: "Exam Status Updated" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to Update Status" },
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
  try {
    const { exam_id } = await req.json();
    await prisma.exam_result.deleteMany({
      where: {
        examId: exam_id,
      },
    });
    await prisma.exam.delete({
      where: {
        id: exam_id,
      },
    });
    revalidatePath("/dashboard/results");
    revalidatePath("/dashboard/exams");
    return NextResponse.json({ msg: "Exam Result Deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to Delete Result" },
      { status: 500 }
    );
  }
}
