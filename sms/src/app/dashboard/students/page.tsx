import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/db";
import { AddStudentForm } from "./_components/StudentForm";
import StudentsList from "./_components/StudentList";
const StudenListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
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
          <AddStudentForm classData={classes} />
        </div>
        {/* List */}

        <StudentsList students={students} />
      </div>
    </div>
  );
};

export default StudenListPage;
