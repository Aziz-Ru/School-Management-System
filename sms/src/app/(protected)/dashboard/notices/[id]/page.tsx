import { get_notice_info } from "@/lib/controller/get_notices";
import { Status } from "@/lib/types";
import { notFound } from "next/navigation";

const Notice = async ({ params }: { params: { id: string } }) => {
  const { notice, status } = await get_notice_info(params.id);

  if (status !== Status.OK) {
    notFound();
  }

  return (
    <div className="p-10">
      <div className="flex items-center justify-center w-full">
        <iframe src={notice!.filePathName} width={1000} height={800}></iframe>
      </div>
    </div>
  );
};

export default Notice;
