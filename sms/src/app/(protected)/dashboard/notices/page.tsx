import ReadMore from "@/components/buttons/ReadMore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { decrypt } from "@/session";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { get_notice } from "../../../../utils/get_latest_notice";
import { Status } from "../../../../utils/types";
import NoticeCreateForm from "./_components/NoticeCreateForm";

const git = async () => {
  const cookieStore = cookies();
  const session = cookieStore.get("__session");
  const { user } = await decrypt(session!.value);

  if (user.role !== "ADMIN") {
    notFound();
  }
  const { notices, status } = await get_notice(5);

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="p-4 grid grid-cols-12 md:flex-row">
        <div className=" col-span-12 md:col-span-7 flex flex-col gap-4 w-full px-6">
          <NoticeCreateForm />
        </div>
        <div className="col-span-12 md:col-span-5">
          <div className="">
            <h1 className="font-bold text-2xl mb-4">Notices</h1>
            {status != Status.OK ? (
              <div className="font-medium">There are no notice</div>
            ) : (
              <div className="">
                {notices?.map((notice, index) => {
                  return (
                    <Card key={index} className="my-3">
                      <CardHeader>
                        <CardTitle>{notice.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>
                          <p>{notice.content.substring(0, 100)}</p>
                          <div className="flex justify-between items-center">
                            <span>{notice.createdAt.toDateString()}</span>
                            <ReadMore href={`/notices/${notice.id}`} />
                          </div>
                        </CardDescription>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default git;
