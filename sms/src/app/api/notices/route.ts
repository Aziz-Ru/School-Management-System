import prisma from "@/lib/db";
import { NoticeSchema } from "@/lib/schema/schema";
import { supabase } from "@/lib/supbase";
import { decrypt } from "@/session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const session = cookies().get("__session")?.value;
    if (session == null) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { user } = await decrypt(session);
    if (user == null) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const formData = await req.formData();
    const inputFile = formData.get("file") as File;
    if (inputFile == null || inputFile.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Please upload a PDF file." },
        { status: 400 }
      );
    }
    const uploadFile = new File([inputFile], `notice/${uuid4()}.pdf`, {
      type: "application/pdf",
    });
    const { error } = await supabase.storage
      .from("sms")
      .upload(uploadFile.name, uploadFile);
    if (error) {
      throw error;
    }

    const uploadUrl = await supabase.storage
      .from("sms")
      .getPublicUrl(uploadFile.name);

    const validation = NoticeSchema.safeParse({
      title: formData.get("title") as string,
      type: formData.get("type") as string,
      fileUploadUrl: uploadUrl.data.publicUrl,
    });

    if (!validation.success) {
      await supabase.storage.from("sms").remove([uploadFile.name]);
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    await prisma.notice.create({
      data: {
        title: validation.data.title,
        type: validation.data.type,
        filePathName: validation.data.fileUploadUrl,
      },
    });
    revalidatePath("/dashboard/notices");
    revalidatePath("/home");
    return NextResponse.json({ msg: "Notice created successfully." });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create Notice" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = cookies().get("__session")?.value;
    if (session == null) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { user } = await decrypt(session);
    if (user == null) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = new URLSearchParams(req.url);
    const body = await req.json();

    if (body.id == null) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    await prisma.notice.delete({
      where: { id: body.id },
    });
    revalidatePath("/dashboard/notices");
    return NextResponse.json(
      { msg: "Notice deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete Notice" },
      { status: 500 }
    );
  }
}
