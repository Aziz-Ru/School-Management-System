import React from "react";
import { Table, TableHead, TableHeader, TableRow } from "./ui/table";

const TableList = ({
  columns,
  renderRow,
  data,
}: {
  renderRow: (item: any) => React.ReactNode;
  data: any[];
  columns: { header: string; accessor: string; className?: string }[];
}) => {
  return (
    <Table className="mt-4 w-full border">
      <TableHeader>
        <TableRow className="text-left bg-black hover:bg-black text-white">
          {columns.map((column) => {
            return (
              <TableHead
                key={column.accessor}
                className={`${column.className} border-r text-white`}
              >
                {column.header}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </Table>
  );
};

export default TableList;
