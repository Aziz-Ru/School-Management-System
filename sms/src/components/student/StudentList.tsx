import DetailsLink from "@/components/buttons/DetailsLink";
import TableList from "@/components/TableList";
import { TableCell, TableRow } from "@/components/ui/table";
import { StudentTableListColumn } from "@/lib/table_columns";
import { User } from "@/lib/types";
import Image from "next/image";

const StudentsList = ({ students }: { students: User[] }) => {
  const renderRow = (item: User) => {
    return (
      <TableRow key={item.id}>
        <TableCell className="flex items-center gap-4 p-3 border-l">
          <Image
            src={item.img ? item.img : "/image/noavatar.png"}
            alt="profile"
            width={40}
            height={40}
            className="rounded-full md:hidden xl:block w-10 h-10"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold">{`${item.studentProfile?.first_name} ${item.studentProfile?.last_name}`}</h3>
            <span className="text-xs text-gray-500">
              {item.studentProfile?.student_id}
            </span>
          </div>
        </TableCell>

        <TableCell className="hidden md:table-cell px-1 border">
          {item.studentProfile?.section?.section_name}
        </TableCell>

        <TableCell className="hidden lg:table-cell px-1 border">
          {item.phone}
        </TableCell>
        <TableCell className="hidden xl:table-cell px-1 border">
          {item.address}
        </TableCell>
        <TableCell className="hidden xl:table-cell px-1 border">
          {new Date(item.lastLogin!).toDateString()}
        </TableCell>
        <TableCell className="border">
          <DetailsLink
            title="Profile"
            href={`/dashboard/students/${item.id}`}
          />
        </TableCell>
      </TableRow>
    );
  };

  return (
    <TableList
      columns={StudentTableListColumn}
      renderRow={renderRow}
      data={students}
    />
  );
};

export default StudentsList;
