import DetailsLink from "@/components/buttons/DetailsLink";
import TableList from "@/components/TableList";
import { TableCell, TableRow } from "@/components/ui/table";
import { ClassSubject } from "@/lib/types";

const courseColumns = [
  {
    header: "Subject",
    accessor: "info",
    className: "px-2",
  },
  {
    header: "Action",
    accessor: "action",
    className: "text-center",
  },
];

const ClassSubjects = ({
  subjects,
  currentPath,
}: {
  subjects: ClassSubject[];
  currentPath: string;
}) => {
  const renderCourseTableRow = (item: ClassSubject) => {
    return (
      <TableRow key={item.subject_name}>
        <TableCell className="flex items-center p-3 ">
          <h3 className="font-semibold">{item.subject?.subject_name}</h3>
        </TableCell>

        <TableCell className="px-2 text-center">
          <DetailsLink href={`${currentPath}/${item.subject_name}`} />
        </TableCell>
      </TableRow>
    );
  };
  return (
    <TableList
      columns={courseColumns}
      renderRow={renderCourseTableRow}
      data={subjects}
    />
  );
};

export default ClassSubjects;
