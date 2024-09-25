import Pagination from "@/components/Pagination";
import TableList from "@/components/TableList";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import Image from "next/image";
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
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },

  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Adress",
    accessor: "phone",
    className: "hidden xl:table-cell",
  },

  {
    header: "Action",
    accessor: "action",
  },
];

type Class = {
  id: number;
  studentId: string;
  name: string;
  classId: string;
  photo: string;
  address: string;
  phone: string;
};

const CourseListPage = async () => {
  const renderRow = (item: Class) => {
    return (
      <tr
        key={item.id}
        className="border-b site-border odd:bg-zinc-100 dark:odd:bg-slate-700 even:bg-gray-200 dark:even:bg-gray-700 hover:bg-purple-200 dark:hover:bg-gray-600"
      >
        <td className="flex items-center gap-4 p-3 ">
          <Image
            src={item.photo}
            alt="profile"
            width={40}
            height={40}
            className="rounded-full md:hidden xl:block w-10 h-10"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold">{item.name}</h3>
            <span className="text-xs text-gray-500">{item.classId}</span>
          </div>
        </td>
        <td className="hidden md:table-cell px-1">{item.studentId}</td>
        <td className="hidden lg:table-cell px-1">{item.phone}</td>
        <td className="hidden xl:table-cell px-1">{item.address}</td>
        <td>
          <div className="flex items-center gap-2">
            {role == "admin" && (
              <Link href={`/list/teachers/${item.id}`}>
                <HiEye className="w-5 h-5" />
              </Link>
            )}
            <Link href={`/list/teachers`}>
              <HiTrash className="w-5 h-5" />
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
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
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
      <TableList columns={columns} renderRow={renderRow} data={[]} />
      {/* Pagination */}
      <div className="">
        <Pagination />
      </div>
    </div>
  );
};

export default CourseListPage;
