import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const classRoom = await prisma.classRoom.findMany({});

    return NextResponse.json({ classRoom }, { status: 200 });
  } catch (error) {
    return NextResponse.error({ message: error.message }, { status: 500 });
  }
};
