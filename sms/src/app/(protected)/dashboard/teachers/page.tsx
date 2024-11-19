import TableSearch from "@/components/TableSearch";
import AddTeacherForm from "@/components/teacher/AddTeacherForm";
import TeacherList from "@/components/teacher/TeacherList";
import { get_teachers } from "@/lib/controller/get_teachers";
import { Status } from "@/lib/types";
import { decrypt } from "@/session";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const Teacher = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const cookieStore = cookies();
  const session = cookieStore.get("__session");
  const { user } = await decrypt(session!.value);

  if (user.role !== "ADMIN" && user.role !== "TEACHER") {
    notFound();
  }

  const { q, ...queryParams } = searchParams;

  const { teachers, subjects, status } = await get_teachers({ q: q });
  if (status !== Status.OK) {
    notFound();
  }

  return (
    <div className="site-bg p-4 m-4 mt-0 flex-1">
      <div className="flex items-center justify-between">
        <TableSearch name="Teacher Name" />
        {user.role === "ADMIN" && <AddTeacherForm subjects={subjects!} />}
      </div>
      <div>
        {teachers?.length! > 0 && (
          <TeacherList teachers={teachers!} role="ADMIN" />
        )}
      </div>
    </div>
  );
};

export default Teacher;
