import DetailsLink from "@/components/buttons/DetailsLink";
import Pagination from "@/components/Pagination";
import TableList from "@/components/TableList";
import TableSearch from "@/components/TableSearch";
import { TableCell, TableRow } from "@/components/ui/table";
import { ITEM_PAR_PAGE } from "@/lib/data";
import Image from "next/image";
import AddTeacherForm from "./AddTeacherForm";

const columns = [
  {
    header: "Info",
    accessor: "info",
    className: "table-cell",
  },
  {
    header: "Courses",
    accessor: "courses",
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
  courses: { courseName: string }[];
};

const TeacherView = ({
  teachers,
  courses,
  currentPage,
}: {
  teachers: any;
  courses: any;
  currentPage: number;
}) => {
  const count = teachers.length;
  return (
    <div>
      {/* TOP */}
      <div className="flex items-center justify-between">
        <TableSearch />
        <AddTeacherForm courseOption={courses} />
      </div>

      {/* List */}
      {teachers.length > 0 && (
        <TableList columns={columns} renderRow={renderRow} data={teachers} />
      )}
      {/* Pagination */}
      {count > ITEM_PAR_PAGE && (
        <div className="">
          <Pagination total={count} page={currentPage} link="/list/teachers" />
        </div>
      )}
    </div>
  );
};

const renderRow = (item: Teacher) => {
  return (
    <TableRow key={item.id}>
      <TableCell className="flex items-center p-3">
        <Image
          width={40}
          height={40}
          src={item.img || "/image/noavatar.png"}
          alt={item.fullName}
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-2">
          <h3 className="font-semibold">{item.fullName}</h3>
          <p className="text-gray-500">{item.email}</p>
        </div>
      </TableCell>

      <TableCell className="hidden md:table-cell">
        {item.courses.map((course) => (
          <span key={course.courseName} className="badge">
            {course.courseName}
          </span>
        ))}
      </TableCell>

      <TableCell className="hidden md:table-cell">{item.level}</TableCell>
      <TableCell className="hidden lg:table-cell">{item.phone}</TableCell>
      <TableCell className="hidden xl:table-cell">{item.address}</TableCell>

      <TableCell className="text-center">
        <DetailsLink href={`/dashboard/teachers/${item.id}`} />
      </TableCell>
    </TableRow>
  );
};

export default TeacherView;
