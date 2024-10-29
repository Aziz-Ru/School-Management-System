import DetailsLink from "@/components/buttons/DetailsLink";
import TableList from "@/components/TableList";
import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";

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
    header: "Section",
    accessor: "section",
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

interface Student {
  id: string;
  fullName: string;
  section: {
    sectionName: string;
    classId: number;
  };
  address: string;
  img: string | null; // Assuming image might be nullable
  phone: string;
}

const StudentsList = ({ students }: { students: any }) => {
  return <TableList columns={columns} renderRow={renderRow} data={students} />;
};


const renderRow = (item: Student) => {
  return (
    <TableRow key={item.id}>
      <TableCell className="flex items-center gap-4 p-3 ">
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
      </TableCell>
      <TableCell className="hidden md:table-cell px-1">{item.id}</TableCell>
      <TableCell className="hidden md:table-cell px-1">
        {item.section.sectionName}
      </TableCell>

      <TableCell className="hidden lg:table-cell px-1">{item.phone}</TableCell>
      <TableCell className="hidden xl:table-cell px-1">
        {item.address}
      </TableCell>
      <TableCell>
        <DetailsLink href={`/dashboard/students/${item.id}`} />
      </TableCell>
    </TableRow>
  );
};


export default StudentsList;
