import { get_notices } from "@/lib/controller/get_notices";
import Link from "next/link";

const NoticesPage = async () => {
  const { notices } = await get_notices({});
  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="col-span-12 md:col-span-5 my-4 p-2">
        <h2 className="font-bold text-2xl mb-2">Notices</h2>
        {notices!.map((notice) => (
          <div
            key={notice.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-md my-0.5"
          >
            <div>
              <h2 className="font-bold ">{notice.title}</h2>
            </div>
            <Link className="text-blue-600" href={`/home/notices/${notice.id}`}>
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticesPage;
