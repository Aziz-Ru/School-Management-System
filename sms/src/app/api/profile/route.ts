import prisma from "@/lib/db";
import { decrypt } from "@/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cookieid = cookies().get("__u_id")?.value;
  const session = cookies().get("__session")?.value;
  const { user } = await decrypt(session);

  if (!cookieid || !session || !user) {
    return NextResponse.json(
      { error: { msg: "Invalid Request" } },
      { status: 400 }
    );
  }
  const uid = parseInt(cookieid);
  if (isNaN(uid)) {
    return NextResponse.json(
      { error: { msg: "Invalid Request" } },
      { status: 400 }
    );
  }
  const current = new Date();
  if (current.getHours() > 12) {
    return NextResponse.json(
      { error: { msg: "You can't mark attendence after 12 PM" } },
      { status: 400 }
    );
  }
  current.setUTCHours(0, 0, 0, 0);

  if (current.toDateString().split(" ")[0] == "Fri") {
    return NextResponse.json(
      { error: { msg: "You can't mark attendence on Friday" } },
      { status: 400 }
    );
  }
  try {
    await prisma.teacherAttendence.create({
      data: {
        teacher: {
          connect: {
            id: uid,
          },
        },
        date: current.toISOString(),
        month: current.getMonth(),
        year: current.getFullYear(),
      },
    });
    return NextResponse.json({ msg: "Attendence Marked" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { msg: "Internal Server Error" } },
      { status: 500 }
    );
  }
}
