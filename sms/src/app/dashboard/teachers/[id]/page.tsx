import Annoucement from "@/components/Annoucement";
import BigCalendar from "@/components/BigCalendar";
import Icon from "@/components/LucidIcon";
import Image from "next/image";
import Link from "next/link";

const SingleTeacherPage = async ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* User INFO */}
          <div className="bg-sky-200 dark:bg-sky-900 py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                className="rounded-full w-36 h-36 object-cover"
                src={"/image/noavatar.png"}
                width={144}
                height={144}
                alt="Avatar"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold site-txt">Name:Jhon Doe</h1>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Lorem ipsum dolor sit amet,
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs  font-medium">
                <div className="w-full md:w-1/3 flex items-center gap-2">
                  <Icon name="HeartPulse" size={18} />
                  <span className="site-txt">Blood Type</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2">
                  <Icon name="Mail" size={18} />
                  <span className="site-txt">Email</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2">
                  <Icon name="Calendar" size={18} />
                  <span className="site-txt">Date</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  <span className="site-txt">Phone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Calendar */}
        <div className="">
          <BigCalendar />
        </div>
      </div>
      <div className="w-full xl:w-1/3 px-4">
        <div className="site-bg p-4 rounded-md border site-border shadow-sm">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex flex-wrap text-xs gap-4">
            <Link
              className="p-3 rounded-md site-txt bg-purple-200 dark:bg-purple-800"
              href="/dashboard/list/cls"
            >
              Class
            </Link>
            <Link
              className="p-3 rounded-md site-txt bg-sky-200 dark:bg-sky-800"
              href="/dashboard/list/sections"
            >
              Sections
            </Link>
            <Link
              className="p-3 rounded-md site-txt bg-pink-200 dark:bg-pink-800"
              href="/dashboard/list/teachers"
            >
              Teachers
            </Link>
            <Link
              className="p-3 rounded-md site-txt bg-red-200 dark:bg-red-800"
              href="/dashboard/list/teachers"
            >
              Students
            </Link>
          </div>
        </div>
        <Annoucement />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
