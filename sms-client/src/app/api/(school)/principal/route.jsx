import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    // await prisma.school.create({})
  } catch (error) {}
};

export const GET = async () => {
  try {
    const data = await prisma.school.findFirst();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {}
};
