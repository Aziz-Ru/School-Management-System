import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  console.log(id);
  if (!id) {
    return NextResponse.json({ error: "Id is required" }, { status: 400 });
  }
  try {
    await prisma.section.delete({ where: { id: id } });
    revalidatePath("/list/cls");
    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
};
