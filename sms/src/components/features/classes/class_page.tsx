"use server";
import {
  DeleteButton,
  DetailsButton,
  EditButton,
} from "@/components/buttons/Buttons";
import TableList from "@/components/TableList";
import TableSearch from "@/components/TableSearch";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/lib/data";
import prisma from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddCourseForm from "./components/AddCourseForm";
import AddSectionForm from "./components/AddSectionForm";

const sectionColumns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Students",
    accessor: "students",
    className: "hidden sm:table-cell",
  },
  {
    header: "Year",
    accessor: "year",
    className: "hidden sm:table-cell",
  },
  {
    header: "Super Visor",
    accessor: "supervisor",
    className: "hidden sm:table-cell",
  },

  {
    header: "Action",
    accessor: "actions",
    className: "text-center",
  },
];
const courseColumns = [
  {
    header: "Info",
    accessor: "info",
    className: "px-2",
  },
  {
    header: "Action",
    accessor: "action",
    className: "text-center",
  },
];

type Section = {
  id: string;
  sectionName: string;
  _count: {
    students: number;
  };
  level: string;
  supervisor: string | null;
  year: number;
};

type Course = {
  id: string;
  courseName: string;
  enrolledTeacher: string;
};

const ClassPage = async ({ classId }: { classId: number }) => {
  const level = classId < 6 ? "PRIMARY" : "SCHOOL";

  // find the class
  const [classData, teachers] = await prisma.$transaction([
    prisma.class.findFirst({
      where: { id: classId },
      include: {
        sections: {
          select: {
            id: true,
            sectionName: true,
            year: true,
            supervisor: {
              select: {
                fullName: true,
              },
            },
            _count: { select: { students: true } },
          },
          orderBy: {
            year: "desc",
          },
        },
        course: true,
      },
    }),
    prisma.teacher.findMany({
      where: { level },
      select: {
        id: true,
        fullName: true,
      },
    }),
  ]);
  
  if (!classData) {
    notFound();
  }

  return (
    <div className="grid grid-cols-12">
      {/* Courses */}
      <div className=" col-span-12 xl:col-span-6 border m-2 rounded">
        <div className="site-bg p-4 m-4 mt-0  col-span-12 lg:col-span-5">
          {/* TOP */}
          <div className="flex gap-2 items-center justify-between">
            <TableSearch />
            <AddCourseForm classId={classId} />
          </div>

          {/* List */}
          {classData.course.length > 0 && (
            <TableList
              columns={courseColumns}
              renderRow={renderCourseRow}
              data={classData.course}
            />
          )}
        </div>
      </div>

      {/* Sections */}
      <div className=" col-span-12 xl:col-span-6 border m-2 rounded">
        <div className="site-bg p-4 m-4 mt-0  col-span-12 lg:col-span-5">
          {/* TOP */}
          <div className="flex gap-2 items-center justify-between">
            <TableSearch />
            <AddSectionForm classId={classId} classTeacher={teachers} />
          </div>

          {/* List */}
          {classData.sections.length > 0 && (
            <TableList
              columns={sectionColumns}
              renderRow={renderSectionRow}
              data={classData.sections}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const renderSectionRow = (item: Section) => {
  return (
    <TableRow
      key={item.id}
      className="border-b site-border odd:bg-zinc-100 dark:odd:bg-slate-700 even:bg-gray-200 dark:even:bg-gray-700 hover:bg-purple-200 dark:hover:bg-gray-600"
    >
      <TableCell className="flex items-center p-3 ">
        <h3 className="font-semibold">{item.sectionName}</h3>
      </TableCell>
      <TableCell className="px-2">
        <span className="hidden sm:block">{item._count.students}</span>
      </TableCell>
      <TableCell className="px-2">
        <span className="hidden sm:block">{item.year}</span>
      </TableCell>
      <TableCell className="px-2">
        <span className="hidden sm:block">
          {item.supervisor ? item.supervisor : "Not Assigned"}
        </span>
      </TableCell>

      <TableCell className="px-2">
        <div className="flex items-center gap-2">
          <Link href={`/list/sections/${item.id}`}>
            <DetailsButton />
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
};

const renderCourseRow = (item: Course) => {
  return (
    <TableRow key={item.id}>
      <TableCell className="flex items-center p-3 ">
        <h3 className="font-semibold">{item.courseName}</h3>
      </TableCell>

      <TableCell className="px-2">
        {role === "admin" && (
          <div className="flex gap-4 items-center justify-center ">
            <EditButton />
            <DeleteButton />
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ClassPage;
