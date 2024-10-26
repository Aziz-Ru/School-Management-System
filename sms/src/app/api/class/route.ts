import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const cnt = url.searchParams.get("count");
    if (cnt) {
      const primary = await prisma.class.count({
        where: { level: "PRIMARY" },
      });
      const school = await prisma.class.count({ where: { level: "SCHOOL" } });
      const college = await prisma.class.count({
        where: { level: "COLLEGE" },
      });
      return NextResponse.json({ primary, school, college }, { status: 200 });
    }
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
};
