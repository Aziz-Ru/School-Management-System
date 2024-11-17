import DetailsLink from "@/components/buttons/DetailsLink";
import TableList from "@/components/TableList";
import { TableCell, TableRow } from "@/components/ui/table";
import { ExamSubject } from "@/lib/types";

const ExamsSubjectsList = ({
  exams_subjects,
  exam_id,
}: {
  exam_id: string;
  exams_subjects: ExamSubject[];
}) => {
  const columns = [
    {
      header: "Subject",
      accessor: "subject_name",
    },
    {
      header: "Result",
      accessor: "resutl",
    },
  ];
  const renderRow = (exam: ExamSubject) => {
    return (
      <TableRow key={exam.id}>
        <TableCell>{exam.subject?.subject_name}</TableCell>
        <TableCell>
          <DetailsLink
            title="Mark"
            href={`/dashboard/exams/${exam_id}/${exam.id}`}
          />
        </TableCell>
      </TableRow>
    );
  };
  return (
    <TableList renderRow={renderRow} data={exams_subjects} columns={columns} />
  );
};

export default ExamsSubjectsList;
