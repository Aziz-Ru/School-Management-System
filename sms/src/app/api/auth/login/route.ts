import prisma from "@/lib/db";
import { userSchema } from "@/lib/schema/schema";
import { createSession } from "@/session";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello" });
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { uid, password } = reqBody;

    const validResult = userSchema.safeParse({
      uid: parseInt(uid),
      password: password,
    });

    if (validResult.error) {
      throw new Error("Invalid Credential");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: validResult.data.uid,
      },
      select: {
        id: true,
        password: true,
        role: true,
        sex: true,
        status: true,
        lastLogin: true,
      },
    });

    if (!user) {
      throw new Error("Invalid Credential");
    }
    const isMatchPassword = await bcrypt.compare(
      validResult.data.password,
      user.password
    );
    if (!isMatchPassword) {
      throw new Error("Invalid Credential");
    }

    await createSession({
      id: user.id,
      role: user.role,
      _xx_httpoui: user.sex,
      _u_ss_t: user.status,
      _l_l: user.lastLogin,
    });
    prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLogin: new Date().toISOString(),
      },
    });

    return NextResponse.json({ role: user.role }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
