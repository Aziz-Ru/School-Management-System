import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { get_exams_info } from "@/lib/controller/get_exams";
import { GradeValues } from "@/lib/data";
import prisma from "@/lib/db";
import getSession from "@/lib/get_session";
import { Status } from "@/lib/types";
import { notFound } from "next/navigation";
import DeleteExam from "../_components/DeleteExam";
import ExamsSubjectsList from "../_components/ExamSubjectList";
import PublishExamResult from "../_components/PublishExamResult";
import UpdateStatus from "../_components/UpdateStatus";

const Exam = async ({ params }: { params: { id: string } }) => {
  const { user } = await getSession();

  if (user.role !== "ADMIN") {
    notFound();
  }
  const { exam_subjects, exam, status } = await get_exams_info(params.id);
  if (status !== Status.OK) {
    notFound();
  }
  const columns = exam_subjects?.map((subject) => {
    return {
      subject_name: subject.subject!.subject_name,
    };
  });

  const subjects_marks = await prisma.subject_marks.findMany({
    where: {
      exam_subject: {
        exam_id: params.id,
      },
    },
    include: {
      exam_subject: true,
    },
  });

  const credit = 3;
  const rowData = subjects_marks.reduce((acc, mark) => {
    const studentId = mark.student_id;
    const subjectName = mark.exam_subject.subject_name;

    if (!acc[studentId]) {
      acc[studentId] = {
        student_id: studentId,
        marks: {},
        grade: 0,
        totalNumber: 0,
      };
    }

    acc[studentId].marks[subjectName] = mark.obtained_marks || 0;
    acc[studentId].totalNumber += mark.obtained_marks || 0;
    acc[studentId].grade +=
      (GradeValues[mark.grade as keyof typeof GradeValues] || 0) * credit;
    return acc;
  }, {} as Record<number, { student_id: number; marks: Record<string, number>; grade: number; totalNumber: number }>);

  const rows = Object.values(rowData);

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="p-6">
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="w-full lg:max-w-96">
            <div className="flex items-center gap-10 justify-between">
              <h1 className="scroll-m-20  text-xl font-semibold tracking-tight first:mt-0">
                Subjects
              </h1>
            </div>
            <ExamsSubjectsList
              exam_id={params.id}
              exams_subjects={exam_subjects!}
            />
          </div>
        </div>

        <div className="">
          <div className="w-full flex items-center justify-between mb-6">
            <h1 className="scroll-m-20  text-xl font-semibold tracking-tight first:mt-0">
              Students
            </h1>
            <div className=" flex items-center gap-10">
              {exam?.publish_status === "DRAFT" ? (
                <PublishExamResult
                  exam_id={params.id}
                  data={JSON.stringify(rows)}
                />
              ) : (
                <UpdateStatus exam_id={params.id} />
              )}
              <DeleteExam exam_id={params.id} />
            </div>
          </div>
          <div className="">
            <Table className="w-full border">
              <TableHeader>
                <TableRow className="w-full">
                  <TableHead>Roll Number</TableHead>
                  {columns!.map((column) => (
                    <TableHead key={column.subject_name}>
                      {column.subject_name}
                    </TableHead>
                  ))}
                  <TableHead>Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.student_id}>
                    <TableCell>{`${row.student_id}`}</TableCell>
                    {columns!.map((column) => (
                      <TableCell key={column.subject_name}>
                        {row.marks[column.subject_name] || "N/A"}
                      </TableCell>
                    ))}
                    <TableCell>
                      {row.grade > 0
                        ? (row.grade / (columns!.length * credit)).toFixed(3)
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
