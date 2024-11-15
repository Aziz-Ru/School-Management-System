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
    <Table className="mt-4 w-full">
      <TableHeader>
        <TableRow className="text-left site-txt text-sm">
          {columns.map((column) => {
            return (
              <TableHead
                key={column.accessor}
                className={`${column.className} border`}
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
