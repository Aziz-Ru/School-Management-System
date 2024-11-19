"use server";
import { decrypt } from "@/session";
import { cookies } from "next/headers";
import AdminPage from "./_components/AdminPage";

const ResultPage = async () => {
  const cookieStore = cookies();
  const session = cookieStore.get("__session");
  const { user } = await decrypt(session!.value);

  if (user.role == "ADMIN") return <AdminPage />;

  return <div></div>;
};

export default ResultPage;
