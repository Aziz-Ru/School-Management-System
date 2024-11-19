"use server";

import DetailsLink from "@/components/buttons/DetailsLink";
import TableList from "@/components/TableList";
import { TableCell, TableRow } from "@/components/ui/table";
import { getAll_exams } from "@/lib/controller/get_results";
import { ExamResultColumns } from "@/lib/data";
import { Exam } from "@/lib/types";

const ResultPage = async () => {
  const { exams } = await getAll_exams();

  const renderRow = (exam: Exam) => {
    return (
      <TableRow key={exam.id}>
        <TableCell className="border-l">{exam.section!.section_name}</TableCell>
        <TableCell>{exam.section!.class_id}</TableCell>
        <TableCell>{exam.type}</TableCell>
        <TableCell className="border-r">
          <DetailsLink title="Result" href={`/dashboard/results/${exam.id}`} />
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold ">Exam Result</h1>
      <div className="">
        <TableList
          data={exams}
          columns={ExamResultColumns}
          renderRow={renderRow}
        />
      </div>
    </div>
  );
};

export default ResultPage;
