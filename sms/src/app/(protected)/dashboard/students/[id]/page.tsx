import NoticeCards from "@/components/NoticeCard";
import prisma from "@/lib/db";
import { get_notice } from "@/lib/utils/get_latest_notice";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProfileCard from "../_components/ProfileCard";
import StudentRoutine from "../_components/Routine";

const Student = async ({ params }: { params: { id: string } }) => {
  const [student] = await prisma.$transaction([
    prisma.student.findUnique({
      where: {
        id: parseInt(params.id),
      },
    }),
  ]);
  const { notices } = await get_notice(3);

  if (!student) {
    notFound();
  }

  return (
    <div className="flex flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4 p-4">
          {/* User INFO */}
          <ProfileCard student={student} />
        </div>
        {/* Routine */}
        <div className="p-4">
          <h1 className="text-xl font-semibold mb-2">Routine</h1>
          <StudentRoutine />
        </div>
      </div>
      <div className="w-full xl:w-1/3 px-4 pt-4">
        <div className="site-bg p-4 rounded-md border site-border shadow-sm ">
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
        <NoticeCards notices={notices} />
      </div>
    </div>
  );
};

export default Student;
