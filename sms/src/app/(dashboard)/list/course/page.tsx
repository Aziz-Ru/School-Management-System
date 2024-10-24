import { DeleteButton, EditButton } from "@/components/buttons/Buttons";
import AddCourseForm from "@/components/features/course/components/AddCourseForm";
import TableList from "@/components/TableList";
import TableSearch from "@/components/TableSearch";
import { TableCell, TableRow } from "@/components/ui/table";
import prisma from "@/lib/db";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Mark",
    accessor: "mark",
    className: "table-cell",
  },
  {
    header: "Teachers",
    accessor: "teacher",
    className: "hidden sm:table-cell",
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
        <AddCourseForm />
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
      <TableCell className="table-cell px-1">{item.mark}</TableCell>
      <TableCell className="hidden sm:table-cell px-1">
        {item._count.teachers}
      </TableCell>
      <TableCell>
        <div className="flex justify-center gap-2">
          <EditButton />
          <DeleteButton />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CourseListPage;
