"use server";

import { decrypt } from "@/session";
import { cookies } from "next/headers";

export default async function getSession() {
  const session = (await cookies()).get("__session")?.value;
  const user = await decrypt(session);
  return user;
}
