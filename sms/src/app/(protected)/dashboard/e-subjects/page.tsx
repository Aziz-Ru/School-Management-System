import DetailsLink from "@/components/buttons/DetailsLink";
import TableList from "@/components/TableList";
import { TableCell, TableRow } from "@/components/ui/table";
import prisma from "@/lib/db";
import getSession from "@/lib/get_session";
import { ExamSubject, SectionSubject } from "@/lib/types";

const EnrolledSubject = async () => {
  const { user } = await getSession();

  const r = await prisma.section_subject.findMany({
    where: {
      teacher_id: user.id,
      section: {
        academic_year: new Date().getFullYear(),
      },
    },
    include: {
      section: true,
    },
  });

  const exam_subjects = await prisma.exam_subjects.findMany({
    where: {
      subject: {
        teacher_id: user.id,
      },
      exam: {
        publish_status: "DRAFT",
      },
    },
    include: {
      exam: {
        select: {
          publish_status: true,
        },
      },
      subject: {
        select: {
          section: {
            select: {
              section_name: true,
            },
          },
          class_id: true,
        },
      },
    },
  });

  const sectionSubjectColumns = [
    {
      header: "Section",
      accessor: "section.section_name",
    },
    {
      header: "Class ID",
      accessor: "class_id",
    },
    {
      header: "Subject Name",
      accessor: "subjectname",
    },
  ];
  const examSubjectColumns = [
    {
      header: "Subject",
      accessor: "subject.subject_name",
    },
    {
      header: "Class ID",
      accessor: "subject.class_id",
    },
    {
      header: "Status",
      accessor: "exam.publish_status",
    },
    {
      header: "Marks",
      accessor: "exam.marks",
    },
  ];

  const enrolled_subject_row = (subject: SectionSubject) => {
    return (
      <TableRow key={subject.section_id}>
        <TableCell>{subject.section?.section_name}</TableCell>
        <TableCell>{subject.class_id}</TableCell>
        <TableCell>{subject.subject_name}</TableCell>
      </TableRow>
    );
  };
  const exam_subject_row = (subject: ExamSubject) => {
    return (
      <TableRow key={subject.id}>
        <TableCell>{`${subject.subject_name}(${subject.subject?.section?.section_name})`}</TableCell>
        <TableCell>{subject.subject?.class_id}</TableCell>
        <TableCell>{subject.exam?.publish_status}</TableCell>
        <TableCell>
          <DetailsLink
            title="Add Mark"
            href={`/dashboard/exams/${subject.exam_id}/${subject.id}`}
          />
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="p-10">
      <div className="flex gap-3 flex-col md:flex-row">
        <div className="mb-6 w-full md:w-1/2">
          <h1 className="text-2xl font-bold">Enrolled Subjects</h1>
          <TableList
            renderRow={enrolled_subject_row}
            columns={sectionSubjectColumns}
            data={r}
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold">Exams</h1>
          <TableList
            renderRow={exam_subject_row}
            columns={examSubjectColumns}
            data={exam_subjects}
          />
        </div>
      </div>
    </div>
  );
};

export default EnrolledSubject;
