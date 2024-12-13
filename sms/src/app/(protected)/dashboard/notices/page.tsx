import NoticeCard from "@/components/NoticeCard";
import { get_notices } from "@/lib/controller/get_notices";
import { Status } from "@/lib/types";
import { decrypt } from "@/session";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import NoticeCreateForm from "./_components/NoticeCreateForm";

const NoticePage = async () => {
  const cookieStore = cookies();
  const session = cookieStore.get("__session");
  const { user } = await decrypt(session!.value);

  if (user.role !== "ADMIN") {
    notFound();
  }

  const { notices, status } = await get_notices({ take: 10 });
  if (status !== Status.OK) {
    return <div>Error</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="p-4 grid grid-cols-12 xl:flex-row">
        <div className=" col-span-12 xl:col-span-7 flex flex-col gap-4 w-full px-6">
          <NoticeCreateForm />
        </div>
        <div className="col-span-12 xl:col-span-5">
          <div className="">
            <h1 className="font-bold text-2xl mb-4">Notices</h1>
            <div className="">
              {notices!.map((notice) => (
                <NoticeCard notice={notice} key={notice.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticePage;
