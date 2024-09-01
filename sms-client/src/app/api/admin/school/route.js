import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await prisma.school.findFirst();
    return NextResponse.json(res);
  } catch (error) {}
};
