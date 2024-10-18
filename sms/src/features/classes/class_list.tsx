"use server";
import FormModal from "@/components/FormModal";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/db";

import { DetailsButton } from "@/components/buttons/Buttons";
import TableList from "@/components/TableList";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";

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
  id: string;
  className: string;
  level: string;
  _count: {
    sections: number;
    course: number;
  };
};

const ClassList = async () => {
  const classList = await prisma.class.findMany({
    include: { _count: { select: { sections: true, course: true } } },
  });

  return (
    <>
      {/* TOP */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-col md:flex-row w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 md:self-auto self-end ">
            {classList.length != 12 ? (
              <FormModal type="add" table="class" />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {/* TABLE */}
      <TableList columns={columns} renderRow={renderRow} data={classList} />
    </>
  );
};

const renderRow = (item: Class) => {
  return (
    <TableRow key={item.id}>
      <TableCell className="flex items-center gap-4 p-3">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.className}</h3>

          <span className="text-xs text-gray-500">{item.id}</span>
        </div>
      </TableCell>
      <TableCell className="px-2">
        <span className="hidden sm:block">{item.level}</span>
      </TableCell>
      <TableCell className="px-2">
        <span className="hidden sm:block">{item._count.sections}</span>
      </TableCell>
      <TableCell className="px-2">
        {/*  */}
        <span className="hidden sm:block">{item._count.course}</span>
      </TableCell>
      <TableCell className="px-2">
        <Link href={`/list/cls/${item.id}`}>
          <DetailsButton />
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default ClassList;
