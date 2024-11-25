import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  
  try {
    const searchParams = new URL(req.url).searchParams;
    const classId = searchParams.get("classId");

    if (!classId || (classId && isNaN(parseInt(classId)))) {
      return NextResponse.json(
        { error: "ClassId is required" },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: "" }, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
