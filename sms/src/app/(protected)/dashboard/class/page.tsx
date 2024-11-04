import prisma from "@/lib/db";
import { decrypt } from "@/session";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import ClassList from "./_components/ClassList";

const ClassListPage = async () => {

  const classList = await prisma.class.findMany({
    include: { _count: { select: { sections: true, course: true } } },
  });
  
  const cookieStore = cookies();
  const session = cookieStore.get("__session");
  const { user } = await decrypt(session!.value);

  if (user.role !== "ADMIN" && user.role !== "TEACHER") {
    notFound();
  }

  return (
    <div className="site-bg p-4 m-4 mt-0 flex-1">
      <ClassList classList={classList} />
    </div>
  );
};

export default ClassListPage;
