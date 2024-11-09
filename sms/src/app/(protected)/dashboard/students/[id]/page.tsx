import NoticeCards from "@/components/NoticeCard";
import { DaysOfWeek, MonthNames, Times } from "@/lib/data";
import { decrypt } from "@/session";
import { getStudentData } from "@/utils/get_studentData";
import { Status } from "@/utils/types";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProfileCard from "../../../../../components/student/components/ProfileCard";
import StudentRoutine from "../../../../../components/student/components/Routine";
import { get_notice } from "../../../../../utils/get_latest_notice";

const Student = async ({ params }: { params: { id: string } }) => {
  const session = cookies().get("__session");
  const { user } = await decrypt(session!.value);
  const sectionId = user.sectionId;

  const uid = parseInt(params.id);
  if (isNaN(uid)) {
    notFound();
  }
  const { student, schedule, attendence, status } = await getStudentData(
    uid,
    sectionId
  );

  const { notices } = await get_notice(3);
  if (status !== Status.OK) {
    notFound();
  }

  const routine = DaysOfWeek.map((day) => {
    let obj: any = { Day: day };

    Times.map((t) => {
      const res = schedule?.find(
        (s) => s.day === day.toUpperCase() && s.startEnd === t.time
      );
      obj[t.time] = res ? `${res.subject!.courseName}` : "";
    });

    return obj;
  });

  const getPresent = (
    attendence: any[],
    day: number,
    month: number
  ): boolean => {
    const res = attendence.find(
      (d) => d.date.getDate() === day && d.date.getMonth() == month
    );

    if (res) {
      return true;
    }
    return false;
  };

  let calendar: any[] = [];
  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(2024, month + 1, 0).getDate();
    let monthData: any = { Month: MonthNames[month] };
    for (let day = 1; day <= daysInMonth; day++) {
      const isPresent = getPresent(attendence!, day, month);
      const dayObj = { [day]: isPresent };
      monthData = { ...monthData, ...dayObj };
    }
    calendar.push(monthData);
  }

  return (
    <div className="flex flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4 p-4">
          {/* User INFO */}
          <ProfileCard student={student!} />
        </div>
        {/* Routine */}
        <div className="p-4">
          <h1 className="text-xl font-semibold mb-2">Routine</h1>
          <StudentRoutine routine={routine} />
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
