import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";
import { decrypt } from "@/session";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const ResultPage = async ({ params }: { params: { id: string } }) => {
  const session = cookies().get("__session");
  const { user } = await decrypt(session!.value);

  const exam = await prisma.exam.findUnique({
    where: {
      id: params.id,
    },
    include: {
      section: {
        select: { class_id: true, section_name: true, section_id: true },
      },
    },
  });
  const results = await prisma.exam_result.findMany({
    where: {
      examId: params.id,
    },
    include: {
      student: {
        select: {
          first_name: true,
          last_name: true,
          student_id: true,
        },
      },
    },
  });

  if (!exam) notFound();

  return (
    <div className="p-10">
      <h1 className="font-bold text-xl leading-loose mb-6">
        {exam.type} Exam Result Of Section {exam.section.section_name}
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
          {results.map((result) => {
            return (
              <TableRow key={result.id}>
                <TableCell>{result.student_id}</TableCell>
                <TableCell>{`${result.student.first_name} ${result.student.last_name}`}</TableCell>
                <TableCell>{result.gpa.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultPage;
