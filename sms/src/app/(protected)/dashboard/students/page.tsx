import { AddStudentForm } from "@/components/student/StudentForm";
import TableSearch from "@/components/TableSearch";
import { get_students } from "@/lib/controller/get_students";
import StudentsList from "../../../../components/student/StudentList";

const StudenListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  // const cookieStore = cookies();
  // const session = cookieStore.get("__session");
  // const { user } = await decrypt(session!.value);
  const user = { role: "ADMIN" };
  // if (user.role !== "ADMIN" && user.role !== "TEACHER") {
  //   notFound();
  // }

  const { status, students, classes } = await get_students({ q: "" });

  const { page, q, ...queryParams } = searchParams;
  const currentPage = page && !isNaN(parseInt(page)) ? parseInt(page) : 1;

  return (
    <div>
      <div className="site-bg p-4 m-4 mt-0 flex-1">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <TableSearch name="Student ID" />
          {user.role == "ADMIN" && <AddStudentForm classData={classes!} />}
        </div>
        {/* List */}

        <StudentsList students={students!} />
      </div>
    </div>
  );
};

export default StudenListPage;
