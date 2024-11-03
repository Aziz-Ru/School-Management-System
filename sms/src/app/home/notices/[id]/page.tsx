import { get_notice_by_id } from "@/lib/utils/get_latest_notice";
import { notFound } from "next/navigation";

const NoticePage = async ({ params }: { params: { id: string } }) => {
  const notice = await get_notice_by_id(params.id);
  if (!notice) {
    notFound();
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="p-10">
        <h1 className="font-bold text-2xl mb-4">{notice.title}</h1>
        <div className="">
          <p>{notice.content}</p>

          <div className="flex justify-between items-center">
            <span>{notice.createdAt.toDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticePage;
