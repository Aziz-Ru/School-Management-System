import Annoucement from "@/components/Annoucement";
import { DaysOfWeek, Times } from "@/lib/data";
import { getAttendencCalendar } from "@/lib/utils";
import { getProfileData } from "@/lib/utils/profile";
import { MonthlyAttendance } from "@/lib/utils/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import AttendenceList from "./_components/AttendenceList";
import TeacherProfileCard from "./_components/TeacherProfileCard";
import TeacherRoutine from "./_components/Troutine";

const ProfilePage = async () => {
  const date = new Date();
  const { status, tAttendence, tSchedule, tProfile } = await getProfileData();
  console.log(status);
  if (status !== 200) {
    notFound();
  }

  const routine = Times.map((t) => {
    const obj: any = { time: t.time };
    const days = DaysOfWeek.map((day) => {
      const daySchedule = tSchedule!.find((s) => s.startEnd === t.time);
      if (daySchedule) {
        obj[day] = `${daySchedule.subject!.courseName}-${
          daySchedule.section!.sectionName + "-" + daySchedule.section!.classId
        }`;
      } else {
        obj[day] = "";
      }
    });
    return { ...obj, ...days };
  });

  const calendar: MonthlyAttendance[] = getAttendencCalendar(tAttendence!);

  return (
    <div className="flex flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4 p-4">
          {/* User INFO */}
          <TeacherProfileCard teacher={tProfile!} />
        </div>
        {/* Routine */}
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-2">Routine</h1>
          <TeacherRoutine rowData={routine} />
        </div>
        <div className="">
          <AttendenceList rowData={calendar} />
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
        <Annoucement />
      </div>
    </div>
  );
};

export default ProfilePage;
