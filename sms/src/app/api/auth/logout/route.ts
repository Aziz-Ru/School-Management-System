import { deleteSession } from "@/session";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  deleteSession();
  redirect("/home");
}
