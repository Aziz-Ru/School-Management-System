import DetailsLink from "@/components/buttons/DetailsLink";
import TableList from "@/components/TableList";
import { TableCell, TableRow } from "@/components/ui/table";
import { sectionsTableColumns } from "@/lib/table_columns";
import { Section } from "@/lib/types";

const SectionListTable = ({ sections }: { sections: Section[] }) => {
  const renderSectionRow = (item: Section) => {
    return (
      <TableRow className="text-gray-800" key={item.section_id}>
        <TableCell className="border p-3 ">
          <h3 className="font-semibold">
            {item.section_name.toLocaleUpperCase()}
          </h3>
        </TableCell>
        <TableCell className="px-2 border">{item.class_id}</TableCell>
        <TableCell className="px-2 hidden sm:table-cell border">
          {item._count?.students}
        </TableCell>
        <TableCell className="px-2 border hidden sm:table-cell">
          {item.academic_year}
        </TableCell>
        <TableCell className="px-2 border hidden sm:table-cell ">
          {item.room_number}
        </TableCell>

        <TableCell className="px-2 border hidden md:table-cell">
          {`${item.teacher?.first_name} ${item.teacher?.last_name}`}
        </TableCell>

        <TableCell className="px-2 border">
          <DetailsLink href={`/dashboard/sections/${item.section_id}`} />
        </TableCell>
      </TableRow>
    );
  };
  return (
    <TableList
      columns={sectionsTableColumns}
      renderRow={renderSectionRow}
      data={sections}
    />
  );
};

export default SectionListTable;
