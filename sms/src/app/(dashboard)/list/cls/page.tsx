
import FormModal from "@/components/FormModal";
import TableList from "@/components/TableList";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/db";
import Link from "next/link";
import {
  HiAdjustmentsHorizontal,
  HiAdjustmentsVertical,
} from "react-icons/hi2";
import { MdDetails } from "react-icons/md";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {

    header: "Level",
    accessor: "level",
    className: "hidden sm:table-cell",
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
    accessor: "action",

  },
];



type Class = {
  id: number;

  className: string;
  level: string;
  _count: {
    sections: number;
    course: number;
  };
};

const ClassListPage = async () => {
  const classList = await prisma.class.findMany({
    include: { _count: { select: { sections: true, course: true } } },
  });

  const renderRow = (item: Class) => {
    return (
      <tr
        key={item.id}
        className="border-b site-border odd:bg-zinc-100 dark:odd:bg-slate-700 even:bg-gray-200 dark:even:bg-gray-700 hover:bg-purple-200 dark:hover:bg-gray-600"
      >
        <td className="flex items-center gap-4 p-3 ">
          <div className="flex flex-col">

            <h3 className="font-semibold">{item.className}</h3>
            <span className="text-xs text-gray-500">{item.id}</span>
          </div>
        </td>
        <td className="px-2">
          <span className="hidden sm:block">{item.level}</span>
        </td>
        <td className="px-2">
          <span className="hidden sm:block">{item._count.sections}</span>
        </td>
        <td className="px-2">
          <span className="hidden sm:block">{item._count.course}</span>
        </td>
        <td className="px-2">
          <Link href={`/list/cls/${item.id}`}>
            <MdDetails className="w-6 h-6" />
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <div className="site-bg p-4 m-4 mt-0 flex-1">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex items-center gap-4 flex-col md:flex-row w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 md:self-auto self-end ">
            <button>
              <HiAdjustmentsHorizontal className="w-5 h-5 site-txt" />
            </button>
            <button>
              <HiAdjustmentsVertical className="w-5 h-5 site-txt" />
            </button>

            {classList.length != 12 ? (
              <FormModal type="add" table="class" />
            ) : (
              ""
            )}

          </div>
        </div>
      </div>
      {/* List */}
      <TableList columns={columns} renderRow={renderRow} data={classList} />
    </div>
  );
};

export default ClassListPage;
