import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const classID = parseInt(id);
    if (isNaN(classID)) {
      return NextResponse.json({ error: "Invalid Data" }, { status: 400 });
    }
    const sections = await prisma.section.findMany({
      where: { classId: classID },
      select: {
        id: true,
        sectionName: true,
      },
    });
    return NextResponse.json({ sections }, { status: 200 });
  } catch (error) {
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
