import prisma from "@/lib/db";
import { NoticeSchema } from "@/lib/schema/schema";
import { supabase } from "@/lib/supbase";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid4 } from "uuid";
export async function POST(req: NextRequest) {
  try {
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
    // const { error } = await supabase.storage
    //   .from("sms")
    //   .upload(uploadFile.name, uploadFile);
    // if (error) {
    //   throw error;
    // }

    // const uploadUrl = await supabase.storage
    //   .from("sms")
    //   .getPublicUrl(uploadFile.name);

    const validation = NoticeSchema.safeParse({
      title: formData.get("title") as string,
      type: formData.get("type") as string,
      fileUploadUrl:
        "https://gdpojtdcyjcuolxmdzsr.supabase.co/storage/v1/object/public/sms/notice/a9acf9dc-787e-436e-a72d-ebf647748f94.pdf",
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
