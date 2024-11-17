import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import SubjectMarkUpdateList from "../../_components/SubjectMarkUpdateList";

const page = async ({
  params,
}: {
  params: { id: string; exam_subject_id: string };
}) => {
  const exam = await prisma.exam.findUnique({
    where: { id: params.id },
    select: {
      section_id: true,
    },
  });

  if (!exam) {
    notFound();
  }
  const exam_subject = await prisma.exam_subjects.findUnique({
    where: {
      id: params.exam_subject_id,
    },
  });

  const subject_marks = await prisma.subject_marks.findMany({
    where: {
      exam_subject_id: params.exam_subject_id,
    },
    orderBy: {
      student_id: "asc",
    },
  });

  return (
    <div className="p-10">
      <SubjectMarkUpdateList
        exam_subject={exam_subject}
        subject_marks={subject_marks}
      />
    </div>
  );
};

export default page;
