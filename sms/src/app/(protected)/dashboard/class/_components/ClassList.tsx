"use server";

import DetailsLink from "@/components/buttons/DetailsLink";
import TableList from "@/components/TableList";
import { TableCell, TableRow } from "@/components/ui/table";
import { classListColumns } from "@/lib/table_columns";
import { Classes } from "@/lib/types";

const ClassList = ({ classList }: { classList: Classes[] }) => {
  const renderClassTableRow = (item: Classes) => {
    return (
      <TableRow key={item.class_id}>
        <TableCell className="flex items-center gap-4 p-3">
          <div className="flex flex-col">
            <h3 className="font-semibold">{item.class_name}</h3>

            <span className="text-xs text-gray-500">{item.class_id}</span>
          </div>
        </TableCell>
        <TableCell className="px-2">
          <span className="hidden sm:block">{item.level}</span>
        </TableCell>
        <TableCell className="px-2">
          <span className="hidden sm:block">{item._count!.sections}</span>
        </TableCell>
        <TableCell className="px-2">
          {/*  */}
          <span className="hidden sm:block">{item._count!.subjects}</span>
        </TableCell>
        <TableCell className="px-2">
          <DetailsLink href={`/dashboard/class/${item.class_id}`} />
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      {classList.length > 0 && (
        <TableList
          columns={classListColumns}
          renderRow={renderClassTableRow}
          data={classList}
        />
      )}
    </>
  );
};

export default ClassList;
