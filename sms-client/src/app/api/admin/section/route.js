import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const sections = await prisma.section.findMany({});
    return NextResponse.json(sections, { status: 200 });
  } catch (error) {
    return NextResponse.error({ message: error.message }, { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const body = await req.json();

    const section = await prisma.section.create({
      data: {
        sectionName: body.sectionName,
        year: body.year,
        classId: parseInt(body.classId),
      },
    });
    return NextResponse.json(section, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.error({ msg: error.message }, { status: 500 });
  }
};
