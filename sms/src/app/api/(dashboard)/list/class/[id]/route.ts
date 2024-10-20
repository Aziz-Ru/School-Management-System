import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  console.log(req);
  try {
    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
};
