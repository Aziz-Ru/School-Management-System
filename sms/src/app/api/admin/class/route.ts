import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const classes = await prisma.classRoom.findMany();
    return NextResponse.json(classes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Something Went Wrong" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await prisma.classRoom.deleteMany();

    const classRoom = await prisma.classRoom.createMany({
      data: [
        { classId: 1, className: "One" },
        { classId: 2, className: "Two" },
        { classId: 3, className: "Three" },
        { classId: 4, className: "Four" },
        { classId: 5, className: "Five" },
        { classId: 6, className: "Six" },
        { classId: 7, className: "Seven" },
        { classId: 8, className: "Eight" },
        { classId: 9, className: "Nine" },
        { classId: 10, className: "Ten" },
        { classId: 11, className: "Eleven" },
        { classId: 12, className: "Twelve" },
      ],
    });
    return NextResponse.json(classRoom, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
};
