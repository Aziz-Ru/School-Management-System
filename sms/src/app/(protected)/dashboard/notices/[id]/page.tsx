import prisma from "@/lib/db";
import { notFound } from "next/navigation";

const Notice = async ({ params }: { params: { id: string } }) => {
  const data = await prisma.notice.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!data) {
    notFound();
  }
  return (
    <div className="p-10">
      <div className="flex items-center justify-center w-full">
        <iframe src={data.filePathName} width={1000} height={800}></iframe>
      </div>
    </div>
  );
};

export default Notice;
