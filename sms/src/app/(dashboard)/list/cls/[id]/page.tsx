import ClassPage from "@/components/features/classes/class_page";

import { notFound } from "next/navigation";

const SingleClassPage = ({ params }: { params: { id: string } }) => {
  const pid = parseInt(params.id);
  // Check is it number or not
  if (isNaN(pid)) {
    notFound();
  }

  return <ClassPage classId={pid} />;
};

export default SingleClassPage;
