import Schedules from "@/components/teacher/Schedules";
import TeacherAttendenceList from "@/components/teacher/TeacherAttendence";
import ProfileCard from "@/components/UserProfileCard";
import { get_teacher_info } from "@/lib/controller/get_teachers";

import { MonthNames } from "@/lib/data";

import { Status } from "@/utils/types";
import { notFound } from "next/navigation";

const TeacherPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string };
}) => {
  const date = searchParams.date ? new Date(searchParams.date) : new Date();
  const uid = parseInt(params.id);
  if (isNaN(uid)) {
    notFound();
  }

  const { teacher, schedules, attendance, status } = await get_teacher_info(
    uid
  );

  if (status !== Status.OK) {
    notFound();
  }

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
    const daysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate();
    let monthData: any = { Month: MonthNames[month] };
    for (let day = 1; day <= daysInMonth; day++) {
      const isPresent = getPresent(attendance!, day, month);
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
          <div className="">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Profile
            </h1>
            <ProfileCard user={teacher!} />
          </div>
        </div>
        {/* Routine */}
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Routine</h1>
          <Schedules schedules={schedules!} />
        </div>
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Attendance
          </h1>
          <TeacherAttendenceList attendanceData={calendar!} />
        </div>
      </div>
    </div>
  );
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default TeacherPage;
