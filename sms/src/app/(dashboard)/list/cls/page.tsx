import TableList from "@/components/TableList";
import TableSearch from "@/components/TableSearch";
import { classData } from "@/lib/data";
import Link from "next/link";
import { HiEye, HiPlus } from "react-icons/hi";
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

type Class = {
  id: number;
  classId: string;
  name: string;
  sections: number;
  courses: number;
};

const ClassListPage = async () => {
  const renderRow = (item: Class) => {
    return (
      <tr
        key={item.id}
        className="border-b site-border odd:bg-zinc-100 dark:odd:bg-slate-700 even:bg-gray-200 dark:even:bg-gray-700 hover:bg-purple-200 dark:hover:bg-gray-600"
      >
        <td className="flex items-center gap-4 p-3 ">
          <div className="flex flex-col">
            <h3 className="font-semibold">{item.name}</h3>
            <span className="text-xs text-gray-500">{item.classId}</span>
          </div>
        </td>
        <td className="px-2">
          <span className="hidden sm:block">{item.sections}</span>
        </td>
        <td className="px-2">
          <span className="hidden sm:block">{item.courses}</span>
        </td>

        <td className="px-2">
          <div className="flex items-center gap-2">
            <Link href={`/list/cls/${item.id}`}>
              <HiEye className="w-5 h-5" />
            </Link>
          </div>
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
            <button>
              <HiPlus className="w-5 h-5 site-txt" />
            </button>
          </div>
        </div>
      </div>
      {/* List */}
      <TableList columns={columns} renderRow={renderRow} data={classData} />
    </div>
  );
};

export default ClassListPage;
