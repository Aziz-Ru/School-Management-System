import { deleteSession } from "@/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await deleteSession();
  return NextResponse.json({ msg: "Logged Out Successfully" }, { status: 200 });
}
