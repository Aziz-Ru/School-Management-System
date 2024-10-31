import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const classIdParams = url.searchParams.get("classId");
  const classId = parseInt(classIdParams as string);
  if (isNaN(classId)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  try {
    const level = classId <= 5 ? "PRIMARY" : "SCHOOL";
    const teachers = await prisma.teacher.findMany({ where: { level: level } });
    return NextResponse.json(teachers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
};
