import DetailsLink from "@/components/buttons/DetailsLink";
import TableList from "@/components/TableList";
import TableSearch from "@/components/TableSearch";
import { TableCell, TableRow } from "@/components/ui/table";
import prisma from "@/lib/db";
import { decrypt } from "@/session";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import AddCourseForm from "./_components/AddCourseForm";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Mark",
    accessor: "mark",
    className: "table-cell text-center",
  },
  {
    header: "Teachers",
    accessor: "teacher",
    className: "hidden sm:table-cell text-center",
  },
  {
    header: "Action",
    accessor: "action",
    className: "text-center",
  },
];

type Course = {
  courseName: string;
  mark: number;
  _count: { teachers: number };
};

const CourseListPage = async () => {
  const cookieStore = cookies();
  const session = cookieStore.get("__session");
  const { user } = await decrypt(session!.value);
  if (user.role !== "ADMIN" && user.role !== "TEACHER") {
    notFound();
  }
  const course = await prisma.course.findMany({
    select: {
      courseName: true,
      mark: true,
      _count: {
        select: {
          teachers: true,
        },
      },
    },
  });

  return (
    <div className="site-bg p-4 m-4 mt-0 flex-1">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <TableSearch />
        {user.role === "ADMIN" && <AddCourseForm />}
      </div>
      {/* List */}
      <TableList columns={columns} renderRow={renderRow} data={course} />
      {/* Pagination */}
    </div>
  );
};

const renderRow = (item: Course) => {
  return (
    <TableRow key={item.courseName}>
      <TableCell className="table-cell px-1">{item.courseName}</TableCell>
      <TableCell className="table-cell text-center">{item.mark}</TableCell>
      <TableCell className="hidden sm:table-cell text-center">
        {item._count.teachers}
      </TableCell>
      <TableCell className="text-center">
        <DetailsLink href={`/dashboard/course/${item.courseName}`} />
      </TableCell>
    </TableRow>
  );
};

export default CourseListPage;
