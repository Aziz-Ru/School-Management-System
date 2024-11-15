import DetailsLink from "@/components/buttons/DetailsLink";
import TableList from "@/components/TableList";
import TableSearch from "@/components/TableSearch";
import { TableCell, TableRow } from "@/components/ui/table";
import { get_sections } from "@/lib/controller/get_sections";
import { sectionsTableColumns } from "@/lib/table_columns";
import { Section, Status } from "@/lib/types";

const Sections = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  // const session = cookies().get("__session");
  // const { user } = await decrypt(session?.value);
  // if (user.role !== "ADMIN") {
  //   notFound();
  // }

  const query = searchParams.q;

  const { section, status } = await get_sections({ q: query });
  if (status !== Status.OK) {
    return <div>Failed to load sections</div>;
  }
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
    <div>
      <div className="p-4">
        <div className="">
          <TableSearch name="Section Name" />
        </div>
        <div className="">
          {section!.length > 0 && (
            <TableList
              columns={sectionsTableColumns}
              data={section!}
              renderRow={renderSectionRow}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sections;
