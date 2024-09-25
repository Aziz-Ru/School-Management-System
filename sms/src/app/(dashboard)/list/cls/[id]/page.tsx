import TableList from "@/components/TableList";
import TableSearch from "@/components/TableSearch";
import { courseData, role, sectionData } from "@/lib/data";
import Link from "next/link";
import { HiEye, HiPlus, HiTrash } from "react-icons/hi";
import {
  HiAdjustmentsHorizontal,
  HiAdjustmentsVertical,
} from "react-icons/hi2";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Sections",
    accessor: "sections",
    className: "hidden sm:table-cell",
  },

  {
    header: "Courses",
    accessor: "courses",
    className: "hidden sm:table-cell",
  },

  {
    header: "Action",
    accessor: "actions",
  },
];
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
  },
  {
    header: "Enrolled Teacher",
    accessor: "enrolledTeacher",
    enrolledTeacher: "Teacher",
  },
];

type Section = {
  id: string;
  sectionId: string;
  name: string;
  students: number;
  supervisor: string;
  year: number;
};

type Course = {
  id: string;
  courseName: string;
  enrolledTeacher: string;
};

const ClassPage = () => {
  const renderSectionRow = (item: Section) => {
    return (
      <tr
        key={item.id}
        className="border-b site-border odd:bg-zinc-100 dark:odd:bg-slate-700 even:bg-gray-200 dark:even:bg-gray-700 hover:bg-purple-200 dark:hover:bg-gray-600"
      >
        <td className="flex items-center p-3 ">
          <h3 className="font-semibold">{item.name}</h3>
        </td>
        <td className="px-2">
          <span className="hidden sm:block">{item.students}</span>
        </td>
        <td className="px-2">{item.year}</td>
        <td className="px-2">{item.supervisor}</td>

        <td className="px-2">
          <div className="flex items-center gap-2">
            <Link href={`/list/sections/${item.sectionId}`}>
              <HiEye className="w-5 h-5" />
            </Link>
            {role === "admin" && (
              <Link href={`/list/sections/${item.sectionId}`}>
                <HiTrash className="w-5 h-5" />
              </Link>
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
        className="border-b site-border odd:bg-zinc-100 dark:odd:bg-slate-700 even:bg-gray-200 dark:even:bg-gray-700 hover:bg-purple-200 dark:hover:bg-gray-600"
      >
        <td className="flex items-center p-3 ">
          <h3 className="font-semibold">{item.courseName}</h3>
        </td>
        <td className="px-2">
          <span className="hidden sm:block">{item.enrolledTeacher}</span>
        </td>

        <td className="px-2">
          {role === "admin" && (
            <Link href={`/list/sections/${item.id}`}>
              <HiTrash className="w-5 h-5" />
            </Link>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {/* Sections */}
      <div className="site-bg p-4 m-4 mt-0 flex-1">
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
              <button>
                <HiPlus className="w-5 h-5 site-txt" />
              </button>
            </div>
          </div>
        </div>
        {/* List */}
        <TableList
          columns={sectionColumns}
          renderRow={renderSectionRow}
          data={sectionData}
        />
      </div>
      {/* Courses */}
      <div className="site-bg p-4 m-4 mt-0 flex-1">
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
              <button>
                <HiPlus className="w-5 h-5 site-txt" />
              </button>
            </div>
          </div>
        </div>
        {/* List */}
        <TableList
          columns={courseColumns}
          renderRow={renderCourseRow}
          data={courseData}
        />
      </div>
      ;
    </div>
  );
};

export default ClassPage;
