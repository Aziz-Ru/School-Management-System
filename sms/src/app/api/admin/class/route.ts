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
    const classObject = [];
    const classes = [
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
    ];
    for (let i = 1; i <= 12; i++) {
      classObject.push({ id: `${i}`, className: classes[i - 1] });
    }
    const classRoom = await prisma.classRoom.createMany({
      data: classObject,
    });
    return NextResponse.json(classRoom, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
};
