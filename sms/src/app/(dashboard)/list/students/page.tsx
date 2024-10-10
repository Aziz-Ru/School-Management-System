import { DetailsButton, FilterButton } from "@/components/buttons/Buttons";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import TableList from "@/components/TableList";
import TableSearch from "@/components/TableSearch";
import { ITEM_PAR_PAGE, role } from "@/lib/data";
import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

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
    header: "Address",
    accessor: "address",
    className: "hidden xl:table-cell",
  },

  {
    header: "Action",
    accessor: "action",
  },
];

type Student = {
  id: number;
  fullName: string;
  section: {
    classId: string;
  };
  address: string;
  img: string;
  phone: string;
};

const StudentsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page && !isNaN(parseInt(page)) ? parseInt(page) : 1;

  const [studentsData, classData] = await prisma.$transaction([
    prisma.student.findMany({
      select: {
        id: true,
        fullName: true,
        phone: true,
        img: true,
        address: true,
        section: { select: { classId: true } },
      },
      skip: (p - 1) * ITEM_PAR_PAGE,
      take: ITEM_PAR_PAGE,
    }),
    prisma.class.findMany({
      include: { sections: { select: { id: true, sectionName: true } } },
    }),
  ]);
  if (classData.length == 0) {
    redirect("/list/cls");
  }

  return (
    <div className="site-bg p-4 m-4 mt-0 flex-1">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex items-center gap-4 flex-col md:flex-row w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 md:self-auto self-end ">
            <FilterButton />
            <FormModal table="student" type="add" data={classData} />
          </div>
        </div>
      </div>
      {/* List */}
      <TableList columns={columns} renderRow={renderRow} data={studentsData} />
      {/* Pagination */}
      <div className="">
        <Pagination total={0} page={0} link="/list/students" />
      </div>
    </div>
  );
};

const renderRow = (item: Student) => {
  return (
    <tr
      key={item.id}
      className="border-b site-border odd:bg-zinc-100 dark:odd:bg-slate-700 even:bg-gray-200 dark:even:bg-gray-700 hover:bg-purple-200 dark:hover:bg-gray-600"
    >
      <td className="flex items-center gap-4 p-3 ">
        <Image
          src={item.img ? item.img : "/image/noavatar.png"}
          alt="profile"
          width={40}
          height={40}
          className="rounded-full md:hidden xl:block w-10 h-10"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.fullName}</h3>
          <span className="text-xs text-gray-500">{item.section.classId}</span>
        </div>
      </td>
      <td className="hidden md:table-cell px-1">{item.id}</td>
      <td className="hidden lg:table-cell px-1">{item.phone}</td>
      <td className="hidden xl:table-cell px-1">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link className="border-2" href={`/list/students/${item.id}`}>
            <DetailsButton />
          </Link>
          {role == "admin" && (
            <FormModal table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );
};

export default StudentsListPage;
