import prisma from "@/lib/db";
import { sectionSchema } from "@/lib/schema/Schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const classes = await prisma.section.findMany({
      where: {
        sectionName: searchParams.get("sn") || undefined,
        classId: searchParams.get("cd") || undefined,
        year: searchParams.get("y") || undefined,
      },
    });
    return NextResponse.json(classes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Something Went Wrong" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const validateInput = sectionSchema.safeParse(body);

    if (!validateInput.success) {
      const errors = validateInput.error.issues.map((issue) => {
        const path = issue.path.join(".");
        return {
          path,
          msg: issue.message,
        };
      });
      return NextResponse.json({ errors }, { status: 400 });
    }

    const sectionExist = await prisma.section.findFirst({
      where: {
        sectionName: `${validateInput.data.sectionName}-${
          validateInput.data.year % 100
        }`,
      },
    });

    if (sectionExist) {
      return NextResponse.json(
        { errors: [{ path: "sectionName", msg: "Section Already Exist" }] },
        { status: 400 }
      );
    }

    const section = await prisma.section.create({
      data: {
        sectionName: `${validateInput.data.sectionName}-${
          validateInput.data.year % 100
        }`,
        year: `${validateInput.data.year}`,
        classId: `${validateInput.data.classId}`,
      },
    });

    return NextResponse.json(section, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ msg: "Something Went Wrong" }, { status: 500 });
  }
};
