import ReadMore from "@/components/buttons/ReadMore";
import { Card } from "@/components/ui/card";
import { SCHOOL_INTRO, SCHOOL_NAME } from "@/lib/data";
import Link from "next/link";

const page = async () => {
  // const { notices, status } = await get_notice(3);

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
        <div className="col-span-12 md:col-span-5 my-4">
          {/* <NoticeCards notices={notices} /> */}
        </div>
      </div>
    </div>
  );
};

export default page;
