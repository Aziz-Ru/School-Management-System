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

    const prevResult = await prisma.exam_result.findMany({
      where: {
        examId: exam_id,
        student_id: {
          in: results.map((res: any) => res.student_id),
        },
      },
    });
    if (prevResult.length > 0) {
      return NextResponse.json(
        {
          error:
            "Result Already Published If you want to  republish the result please delete previous result",
        },
        { status: 400 }
      );
    }

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
