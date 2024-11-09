"use client";
import DetailsLink from "@/components/buttons/DetailsLink";
import TableList from "@/components/TableList";
import TableSearch from "@/components/TableSearch";
import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { useMemo } from "react";
import AddTeacherForm from "./AddTeacherForm";

interface Teacher {
  id: number;
  fullName: string;
  email: string;
  img: string | null;
  address: string;
  level: string;
  phone: string;
  courses: { courseName: string }[];
}

interface TeacherListProps {
  teachers: Teacher[];
  courses: any;
  role: string;
}

const TeacherList = ({ teachers, courses, role }: TeacherListProps) => {
  const Columns = useMemo(() => {
    const base = [
      {
        header: "Info",
        accessor: "info",
        className: "table-cell",
      },
      {
        header: "ID",
        accessor: "id",
        className: "table-cell ",
      },
      {
        header: "Course",
        accessor: "course",
        className: "hidden md:table-cell ",
      },
      {
        header: "Phone",
        accessor: "phone",
        className: "hidden md:table-cell ",
      },

      {
        header: "Level",
        accessor: "level",
        className: "hidden md:table-cell ",
      },

      {
        header: "Address",
        accessor: "address",
        className: "hidden xl:table-cell ",
      },
    ];
    if (role === "ADMIN") {
      base.push({
        header: "Action",
        accessor: "action",
        className: "text-center",
      });
    }
    return base;
  }, [role]);

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
        <TableCell>{item.id}</TableCell>

        <TableCell className="hidden md:table-cell">
          {item.courses.map((course) => (
            <span key={course.courseName} className="badge">
              {course.courseName}
            </span>
          ))}
        </TableCell>
        <TableCell className="hidden md:table-cell">{item.phone}</TableCell>
        <TableCell className="hidden md:table-cell">{item.level}</TableCell>
        <TableCell className="hidden xl:table-cell">{item.address}</TableCell>

        {role === "ADMIN" && (
          <TableCell className="text-center">
            <DetailsLink href={`/dashboard/teachers/${item.id}`} />
          </TableCell>
        )}
      </TableRow>
    );
  };

  return (
    <div>
      {/* TOP */}
      <div className="flex items-center justify-between">
        <TableSearch />
        {role === "ADMIN" && <AddTeacherForm courseOption={courses} />}
      </div>
      <div className="">
        <TableList columns={Columns} data={teachers} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default TeacherList;
