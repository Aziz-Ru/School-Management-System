import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { exam_id, data } = await req.json();

    const results = JSON.parse(data);

    console.log(results[0]);
    await prisma.exam_result.createMany({
      data: results.map((res: any) => {
        const totalSubjects = Object.keys(res.marks).length;
        return {
          examId: exam_id,
          student_id: res.student_id,
          totalObtainedMarks: res.totalNumber,
          totalMarks: totalSubjects * 100,
          gpa: ((res.grade * 3) / totalSubjects) * 3,
          
        };
      }),
    });

    return NextResponse.json({ msg: "Exam Result Published" });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Failed to Publish Result" },
      { status: 500 }
    );
  }
}
