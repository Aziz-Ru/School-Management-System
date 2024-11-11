import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/db";
import { AddStudentForm } from "../../../../components/student/components/StudentForm";
import StudentsList from "../../../../components/student/components/StudentList";

const StudenListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  // const cookieStore = cookies();
  // const session = cookieStore.get("__session");
  // const { user } = await decrypt(session!.value);

  // if (user.role !== "ADMIN" && user.role !== "TEACHER") {
  //   notFound();
  // }
  return <div>Hi</div>;

  const { page, ...queryParams } = searchParams;
  const currentPage = page && !isNaN(parseInt(page)) ? parseInt(page) : 1;
  const [students, classes] = await prisma.$transaction([
    prisma.student.findMany({
      select: {
        id: true,
        fullName: true,
        section: {
          select: {
            sectionName: true,
            classId: true,
          },
        },
        address: true,
        img: true,
        phone: true,
      },
    }),
    prisma.class.findMany({
      select: {
        id: true,
        className: true,
        sections: { select: { id: true, sectionName: true } },
      },
    }),
  ]);

  return (
    <div>
      <div className="site-bg p-4 m-4 mt-0 flex-1">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <TableSearch />
          {user.role == "ADMIN" && <AddStudentForm classData={classes} />}
        </div>
        {/* List */}

        <StudentsList students={students} />
      </div>
    </div>
  );
};

export default StudenListPage;
