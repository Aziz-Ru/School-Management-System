"use client";
import DetailsLink from "@/components/buttons/DetailsLink";
import TableList from "@/components/TableList";
import { TableCell, TableRow } from "@/components/ui/table";
import { User } from "@/lib/types";
import Image from "next/image";
import { useMemo } from "react";

const TeacherList = ({
  teachers,
  role,
}: {
  teachers: User[];
  role: string;
}) => {
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
        header: "Subject",
        accessor: "subject",
        className: "hidden md:table-cell ",
      },
      {
        header: "Degree",
        accessor: "degree",
        className: "hidden xl:table-cell ",
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
        header: "Last Login",
        accessor: "last_login",
        className: "hidden xl:table-cell",
      });

      base.push({
        header: "Profile",
        accessor: "action",
        className: "text-center",
      });
    }
    return base;
  }, [role]);

  const renderRow = (item: User) => {
    return (
      <TableRow key={`${item.id}-${item.address}`}>
        <TableCell className="flex items-center border-l">
          <Image
            width={40}
            height={40}
            src={item.img || "/image/noavatar.png"}
            alt={"profile"}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-2">
            <h3 className="font-semibold">{`${item.teacherProfile?.first_name} ${item.teacherProfile?.last_name}`}</h3>
            <p className="text-gray-500">{item.email}</p>
          </div>
        </TableCell>
        <TableCell className="border">{item.id}</TableCell>

        <TableCell className="hidden md:table-cell">
          {item.teacherProfile?.subject_name}
        </TableCell>
        <TableCell className="hidden xl:table-cell border">
          {item.teacherProfile?.degrees}
        </TableCell>
        <TableCell className="hidden md:table-cell border">
          {item.phone}
        </TableCell>
        <TableCell className="hidden md:table-cell border">
          {item.teacherProfile?.level}
        </TableCell>
        <TableCell className="hidden xl:table-cell border">
          {item.address!}
        </TableCell>
        <TableCell className="hidden xl:table-cell border">
          {item.lastLogin ? item.lastLogin.toDateString() : "NO Info"}
        </TableCell>

        {role === "ADMIN" && (
          <TableCell className="text-center border">
            <DetailsLink
              href={`/dashboard/teachers/${item.id}`}
              title="Profile"
            />
          </TableCell>
        )}
      </TableRow>
    );
  };

  return <TableList columns={Columns} data={teachers} renderRow={renderRow} />;
};

export default TeacherList;
