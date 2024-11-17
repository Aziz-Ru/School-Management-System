import DetailsLink from "@/components/buttons/DetailsLink";
import TableList from "@/components/TableList";
import { TableCell, TableRow } from "@/components/ui/table";
import { ExamsListTableColumns } from "@/lib/table_columns";
import { Exam } from "@/lib/types";

const ExamsList = ({ exams }: { exams: Exam[] }) => {
  const renderRow = (exam: Exam) => {
    return (
      <TableRow key={exam.id}>
        <TableCell className="border-l">
          {exam.section!.section_name}({exam.section!.class_id})
        </TableCell>
        <TableCell className="border">{exam.type}</TableCell>
        <TableCell className="hidden xl:table-cell border">
          {exam.start_date.toDateString()}
        </TableCell>
        <TableCell className="hidden xl:table-cell border">
          {exam.end_date.toDateString()}
        </TableCell>
        <TableCell className="border">{exam.publish_status}</TableCell>
        <TableCell className="border-r">
          <DetailsLink href={`/dashboard/exams/${exam.id}`} />
        </TableCell>
      </TableRow>
    );
  };
  return (
    <TableList
      renderRow={renderRow}
      data={exams}
      columns={ExamsListTableColumns}
    />
  );
};

export default ExamsList;
