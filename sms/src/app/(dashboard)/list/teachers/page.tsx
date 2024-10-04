import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import TableList from "@/components/TableList";
import TableSearch from "@/components/TableSearch";

import { role } from "@/lib/data";
import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { role, teacherData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

import {
  HiAdjustmentsHorizontal,
  HiAdjustmentsVertical,
} from "react-icons/hi2";
import { IoMdEye } from "react-icons/io";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Level",
    accessor: "level",
    {
    header: "Department",
    accessor: "department",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden xl:table-cell",
  },
  {
    header: "Action",
    accessor: "action",
  },
];

type Teacher = {
  id: string;
  fullName: string;
  email: string;
  img: string;
  address: string;
  level: string;
  phone: string;
};

const Employee = async () => {

  
  const teachers = await prisma.teacher.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      img: true,
      level: true,
      address: true,
      phone: true,
    },
    skip: 0,
    take: 10,
  });


  const renderRow = (item: Teacher) => {
    return (
      <tr
        key={item.id}
        className="border-b site-border odd:bg-zinc-100 dark:odd:bg-zinc-700 even:bg-gray-200 dark:even:bg-gray-700 hover:bg-purple-200 dark:hover:bg-gray-600"
      >
        <td className="flex items-center gap-4 p-3 ">

          {item.img == null ? (
            <Image
              src={`/image/noavatar.png`}
              alt="profile"
              width={40}
              height={40}
              className="rounded-full md:hidden xl:block w-10 h-10"
            />
          ) : (
            <Image
              src={item.img}
              alt="profile"
              width={40}
              height={40}
              className="rounded-full md:hidden xl:block w-10 h-10"
            />
          )}
          <div className="flex flex-col">
            <h3 className="font-semibold">{item.fullName}</h3>
            <span className="text-xs text-gray-500">{item.email}</span>
          </div>
        </td>
        <td className="hidden md:table-cell px-1">{item.id}</td>
        <td className="hidden md:table-cell px-1">{item.level}</td>
          <div className="flex flex-col">
            <h3 className="font-semibold">{item.name}</h3>
            <span className="text-xs text-gray-500">{item.email}</span>
          </div>
        </td>
        <td className="hidden lg:table-cell px-1">{item.phone}</td>
        <td className="hidden xl:table-cell px-1">{item.address}</td>
        <td>
          <div className="flex items-center gap-2">
            {role == "admin" && (
              <FormModal table="teacher" type="delete" id={item.id} />
            )}
            <Link
              className="w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center"
              href={`/list/teachers/${item.id}`}
            >
              <IoMdEye className="w-4 h-4 site-txt" />
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
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex items-center gap-4 flex-col md:flex-row w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 md:self-auto self-end ">
            <button>
              <HiAdjustmentsHorizontal className="w-5 h-5 site-txt" />
            </button>
            <button>
              <HiAdjustmentsVertical className="w-5 h-5 site-txt" />
            </button>
            <FormModal table="teacher" type="add" />
          </div>
        </div>
      </div>
      {/* List */}
      <TableList columns={columns} renderRow={renderRow} data={teachers} />
      {/* Pagination */}
      <div className="">
        <Pagination />
      </div>
    </div>
  );
};

export default Employee;
