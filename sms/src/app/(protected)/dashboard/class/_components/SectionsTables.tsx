import DetailsLink from "@/components/buttons/DetailsLink";
import TableList from "@/components/TableList";
import { TableCell, TableRow } from "@/components/ui/table";
import { sectionsTableColumns } from "@/lib/table_columns";
import { Section } from "@/lib/types";

const SectionListTable = ({ sections }: { sections: any }) => {
  const renderSectionRow = (item: Section) => {
    return (
      <TableRow key={item.section_id}>
        <TableCell className="flex items-center p-3 ">
          <h3 className="font-semibold">{item.section_name}</h3>
        </TableCell>
        <TableCell className="px-2">
          <span className="hidden sm:block">{item._count?.students}</span>
        </TableCell>
        <TableCell className="px-2">
          <span className="hidden sm:block">{item.academic_year}</span>
        </TableCell>
        <TableCell className="px-2">
          <span className="hidden sm:block">{item.room_number}</span>
        </TableCell>

        <TableCell className="px-2">
          <span className="hidden md:block">{`${item.teacher?.first_name} ${item.teacher?.last_name}`}</span>
        </TableCell>

        <TableCell className="px-2">
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
