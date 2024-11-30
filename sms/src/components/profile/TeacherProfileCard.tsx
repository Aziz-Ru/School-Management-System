"use server";
import Schedules from "@/components/Schedules";
import TeacherAttendenceList from "@/components/TeacherAttendence";
import ProfileCard from "@/components/UserProfileCard";
import { get_teacher_info } from "@/lib/controller/get_teachers";
import { MonthNames } from "@/lib/data";
import { Status } from "@/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";

const TeacherProfileCard = async ({ id }: { id: number }) => {
  const { teacher, schedules, notices, attendance, status } =
    await get_teacher_info(id);

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
  const date = new Date();

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

  const enrolledSection = teacher?.teacherProfile?.class_teacher;
  const thisYearSection = enrolledSection?.find(
    (s) => s.academic_year == new Date().getFullYear()
  );

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
          <Schedules role="TEACHER" schedules={schedules!} />
        </div>
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Attendance
          </h1>
          <TeacherAttendenceList attendanceData={calendar!} />
        </div>
      </div>
      {/* Right */}
      <div className="w-full xl:w-1/3">
        <div className="mt-1 p-2">
          <h2 className="font-bold text-2xl ">
            Enrolled Section for this year
          </h2>
          <div className="mt-3">
            {thisYearSection && (
              <>
                <div className="flex gap-4 justify-around border p-4">
                  <span>{thisYearSection.section_name}</span>
                  <span>{thisYearSection.class_id}</span>
                  <span>{thisYearSection.academic_year}</span>
                  <Link
                    href={`/dashboard/sections/${thisYearSection.section_id}`}
                    className="underline text-blue-600"
                  >
                    Go
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="mt-1 p-2">
          <h2 className="font-bold text-2xl ">Recent Notices</h2>
        </div>
        <div className="mt-1">
          {notices?.map((notice) => (
            <div
              key={notice.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
            >
              <div>
                <h2 className="font-bold ">{notice.title}</h2>
              </div>
              <Link
                className="text-blue-600"
                href={`/home/notices/${notice.id}`}
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

export default TeacherProfileCard;
