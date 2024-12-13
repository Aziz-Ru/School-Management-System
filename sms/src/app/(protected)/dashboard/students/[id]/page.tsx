import StudentProfileCard from "@/components/profile/StudentProfileCard";
import { notFound } from "next/navigation";

const Student = ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    notFound();
  }
  return <StudentProfileCard role="STUDENT" id={id} />;
};

export default Student;
