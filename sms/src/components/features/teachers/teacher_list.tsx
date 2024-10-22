import { DetailsButton } from "@/components/buttons/Buttons";
import DeleteModal from "@/components/DeleteModal";

import Pagination from "@/components/Pagination";
import TableList from "@/components/TableList";
import TableSearch from "@/components/TableSearch";
import { TableCell, TableRow } from "@/components/ui/table";
import { ITEM_PAR_PAGE } from "@/lib/data";
import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import AddTeacherForm from "./components/TeacherForm";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell ",
  },
  {
    header: "Level",
    accessor: "level",
    className: "hidden md:table-cell ",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell ",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden xl:table-cell ",
  },
  {
    header: "Action",
    accessor: "action",
    className: "table-cell text-center",
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

const TeacherList = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page && !isNaN(parseInt(page)) ? parseInt(page) : 1;

  const [teachers, count,courses] = await prisma.$transaction([
    prisma.teacher.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        img: true,
        level: true,
        address: true,
        phone: true,
      },
      skip: (p - 1) * ITEM_PAR_PAGE,
      take: ITEM_PAR_PAGE,
    }),
    prisma.teacher.count(),
    prisma.course.findMany({ select: { courseName: true, id: true } }),
  ]);

  return (
    <div className="site-bg p-4 m-4 mt-0 flex-1">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <TableSearch />
        <AddTeacherForm courses={courses}/>
      </div>

      {/* List */}
      {teachers.length > 0 && (
        <TableList columns={columns} renderRow={renderRow} data={teachers} />
      )}
      {/* Pagination */}
      {count > ITEM_PAR_PAGE && (
        <div className="">
          <Pagination total={count} page={p} link="/list/teachers" />
        </div>
      )}
    </div>
  );
};

const renderRow = (item: Teacher) => {
  return (
    <TableRow key={item.id}>
      <TableCell className="flex items-center gap-4 p-3 ">
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
          <span className="text-xs text-gray-500 hidden sm:block">
            {item.email}
          </span>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell px-1">{item.id}</TableCell>
      <TableCell className="hidden md:table-cell px-1">{item.level}</TableCell>
      <TableCell className="hidden lg:table-cell px-1">{item.phone}</TableCell>
      <TableCell className="hidden xl:table-cell px-1">
        {item.address}
      </TableCell>
      <TableCell>
        <div className="flex justify-center items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <DetailsButton />
          </Link>
          <DeleteModal table="teacher" id={item.id} name={item.fullName} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TeacherList;
