import { NextRequest, NextResponse } from "next/server";

export function GET() {
  try {
    // const students =await prisma.student.findMany({})
  } catch (error) {
    return NextResponse.json({ error: "Server Side Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const data = req.json();
}
