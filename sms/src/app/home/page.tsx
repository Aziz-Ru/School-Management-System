import ReadMore from "@/components/buttons/ReadMore";
import { Card } from "@/components/ui/card";
import { get_notices } from "@/lib/controller/get_notices";
import { SCHOOL_INTRO, SCHOOL_NAME } from "@/lib/data";
import Link from "next/link";

const page = async () => {
  const { notices } = await get_notices({ take: 5 });
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-12">
        <div className=" col-span-12 md:col-span-7 p-2">
          <Card className="px-6 md:px-8 py-4 my-2">
            <h1 className="font-extrabold text-2xl text-center my-2">
              Our Academic Activities
            </h1>
            <div className="flex w-full gap-4">
              <Link href={""} className="w-1/2">
                <Card className="h-24 flex items-center justify-center font-bold text-xl bg-purple-800 text-gray-200">
                  Primary
                </Card>
              </Link>
              <Link href={""} className="w-1/2">
                <Card className=" h-24 flex items-center justify-center font-bold text-xl bg-sky-800 text-gray-200">
                  School
                </Card>
              </Link>
            </div>
          </Card>
          <Card className="px-6 md:px-8 py-4">
            <h2 className="font-bold text-xl text-center py-4 text-gray-900">
              Welcome To {SCHOOL_NAME}
            </h2>
            <p className="text-justify text-gray-600">
              {SCHOOL_INTRO.substring(0, 500)}...
            </p>
            <div className="flex justify-end">
              <ReadMore href="/home" />
            </div>
          </Card>
        </div>
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
              <Link
                className="text-blue-600"
                href={`/dashboard/notices/${notice.id}`}
              >
                View
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
