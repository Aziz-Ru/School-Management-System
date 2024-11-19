import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { get_exam_results } from "@/lib/controller/get_results";
import { notFound } from "next/navigation";

const ResultPage = async ({ params }: { params: { id: string } }) => {
  const { exam, exam_results } = await get_exam_results(params.id);

  if (!exam) notFound();

  return (
    <div className="p-10">
      <h1 className="font-bold text-xl leading-loose mb-6">
        {exam.type} Exam Result Of Section {exam.section!.section_name}
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student ID</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>GPA</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exam_results!.map((result) => {
            return (
              <TableRow key={result.id}>
                <TableCell>{result.student_id}</TableCell>
                <TableCell>{`${result.student!.first_name} ${
                  result.student!.last_name
                }`}</TableCell>
                <TableCell>{result.gpa!.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultPage;
