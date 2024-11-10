import DetailsLink from "@/components/buttons/DetailsLink";
import TableList from "@/components/TableList";
import { TableCell, TableRow } from "@/components/ui/table";
import { decrypt } from "@/session";
import { getSections } from "@/utils/get_sections";
import { Section, Status } from "@/utils/types";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const columns = [
  { header: "Name", accessor: "sectionName" },
  { header: "Class", accessor: "classId" },
  { header: "Year", accessor: "year" },
  { header: "Details", accessor: "action" },
];

const Sections = async () => {
  const session = cookies().get("__session");
  const { user } = await decrypt(session?.value);
  if (user.role !== "ADMIN") {
    notFound();
  }
  const { section, status } = await getSections();
  if (status !== Status.OK) {
    return <div>Failed to load sections</div>;
  }
  const renderRow = (section: Section) => {
    return (
      <TableRow key={section.id}>
        <TableCell>{section.sectionName}</TableCell>
        <TableCell>{section.classId}</TableCell>
        <TableCell>{section.year}</TableCell>
        <TableCell>
          <DetailsLink href={`/dashboard/sections/${section.id}`} />
        </TableCell>
      </TableRow>
    );
  };
  return (
    <div>
      <div className="p-4">
        <h1 className="">Sections</h1>
        <TableList columns={columns} data={section!} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default Sections;
