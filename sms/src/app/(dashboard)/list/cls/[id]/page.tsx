import { DetailsButton } from "@/components/buttons/Buttons";
import FormModal from "@/components/FormModal";
import TableList from "@/components/TableList";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import prisma from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  HiAdjustmentsHorizontal,
  HiAdjustmentsVertical,
} from "react-icons/hi2";

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
  },
];
const courseColumns = [
  {
    header: "Info",
    accessor: "info",
    className: "px-2",
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

const SingleClassPage = async ({ params }: { params: { id: string } }) => {
  const pid = parseInt(params.id);
  // Check is it number or not
  if (isNaN(pid)) {
    notFound();
  }
  // find the class
  const classData = await prisma.class.findFirst({
    where: { id: pid },
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
  });
  // console.log(classData);
  // if not found the class
  if (!classData) {
    notFound();
  }
  // if admin
  // if (role === "admin") {
  //   courseColumns.push({
  //     header: "Action",
  //     accessor: "action",
  //     className: "text-center",
  //   });
  // }

  const updateSections = classData.sections.map((section) => ({
    ...section,
    level: classData.level,
  }));

  return (
    <div className="grid grid-cols-12">
      {/* Courses */}
      <div className="site-bg p-4 m-4 mt-0  col-span-12 lg:col-span-5">
        {/* TOP */}
        <div className="flex gap-2 items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">Courses</h1>
          <div className="flex items-center gap-4 flex-col md:flex-row w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-4 md:self-auto self-end ">
              <button>
                <HiAdjustmentsHorizontal className="w-5 h-5 site-txt" />
              </button>
              <button>
                <HiAdjustmentsVertical className="w-5 h-5 site-txt" />
              </button>
              <FormModal type="add" table="course" data={classData} />
            </div>
          </div>
        </div>

        {/* List */}
        <TableList
          columns={courseColumns}
          renderRow={renderCourseRow}
          data={classData.course}
        />
      </div>

      {/* Sections */}
      <div className="site-bg p-4 m-4 mt-0 flex-1 col-span-12 lg:col-span-7 border-red-300">
        {/* TOP */}
        <div className="flex gap-2 items-center  justify-between">
          <h1 className="hidden md:block text-lg font-semibold">Sections</h1>
          <div className="flex items-center gap-4 flex-col md:flex-row w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-4 md:self-auto self-end ">
              <button>
                <HiAdjustmentsHorizontal className="w-5 h-5 site-txt" />
              </button>
              <button>
                <HiAdjustmentsVertical className="w-5 h-5 site-txt" />
              </button>
              <FormModal type="add" table="section" data={classData} />
            </div>
          </div>
        </div>
        {/* List */}
        <TableList
          columns={sectionColumns}
          renderRow={renderSectionRow}
          data={updateSections}
        />
      </div>
    </div>
  );
};

const renderSectionRow = (item: Section) => {
  return (
    <tr
      key={item.id}
      className="border-b site-border odd:bg-zinc-100 dark:odd:bg-slate-700 even:bg-gray-200 dark:even:bg-gray-700 hover:bg-purple-200 dark:hover:bg-gray-600"
    >
      <td className="flex items-center p-3 ">
        <h3 className="font-semibold">{item.sectionName}</h3>
      </td>
      <td className="px-2">
        <span className="hidden sm:block">{item._count.students}</span>
      </td>
      <td className="px-2">{item.year}</td>
      <td className="px-2">
        {item.supervisor ? item.supervisor : "Not Assigned"}
      </td>

      <td className="px-2">
        <div className="flex items-center gap-2">
          <Link href={`/list/sections/${item.id}`}>
            <DetailsButton />
          </Link>
          {role === "admin" && (
            <FormModal type="delete" table="section" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );
};

const renderCourseRow = (item: Course) => {
  return (
    <tr
      key={item.id}
      className="border-b shadow-sm site-border odd:bg-zinc-100 dark:odd:bg-slate-700 even:bg-gray-200 dark:even:bg-gray-700 hover:bg-purple-200 dark:hover:bg-gray-600"
    >
      <td className="flex items-center p-3 ">
        <h3 className="font-semibold">{item.courseName}</h3>
      </td>

      <td className="px-2">
        {role === "admin" && (
          <div className="flex gap-4 items-center justify-center ">
            <FormModal type="edit" table="course" id={item.id} />
            <FormModal type="delete" table="course" id={item.id} />
          </div>
        )}
      </td>
    </tr>
  );
};

export default SingleClassPage;
