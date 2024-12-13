import { Notice } from "@/lib/types";
import Link from "next/link";

const NoticeCard = ({ notice }: { notice: Notice }) => {
  return (
    <div
      key={notice.id}
      className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
    >
      <div>
        <h2 className="font-bold">{notice.title}</h2>
      </div>
      <div className="">
        <span className="mx-6">{notice.createdAt?.toDateString()}</span>
        <Link
          className="text-blue-600"
          href={`/dashboard/notices/${notice.id}`}
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default NoticeCard;
