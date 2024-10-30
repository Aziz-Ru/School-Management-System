import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    const section = await prisma.section.findUnique({
      where: { id: id },
      select: {
        students: {
          select: {
            _count: true,
          },
        },
        index: true,
        classId: true,
      },
    });

    const currentYear = new Date().getFullYear() % 100;
    const completeSchool = currentYear + (10 - section!.classId) + 1;
    const currenStudents = section!.students.length + 1;
    const mStudent = 100 + currenStudents;

    const studentID = `${currentYear}${completeSchool}${section?.index}${mStudent}`;

    return NextResponse.json({ id: studentID }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
};
