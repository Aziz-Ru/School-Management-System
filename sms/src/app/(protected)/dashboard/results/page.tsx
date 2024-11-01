import { decrypt } from "@/session";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const ResultPage = async () => {
  const cookieStore = cookies();
  const session = cookieStore.get("__session");
  const { user } = await decrypt(session!.value);

  if (user.role !== "ADMIN" && user.role !== "TEACHER") {
    notFound();
  }
  return <div>ResultPage</div>;
};

export default ResultPage;
