import Schedules from "@/components/Schedules";
import TeacherAttendenceList from "@/components/TeacherAttendence";
import UserProfileCard from "@/components/UserProfileCard";
import { get_student_info } from "@/lib/controller/get_students";
import { MonthNames } from "@/lib/data";
import NoticeCard from "../NoticeCard";

const StudentProfileCard = async ({
  role,
  id,
}: {
  role: string;
  id: number;
}) => {
  const { student, attendance, schedules, notices } = await get_student_info(
    id
  );

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
            <UserProfileCard user={student!} />
          </div>
        </div>
        {/* Routine */}
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Routine</h1>
          <Schedules role="STUDENT" schedules={schedules!} />
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
          <h2 className="font-bold text-2xl ">Recent Notices</h2>
        </div>
        <div className="mt-1">
          {notices?.map((notice, index) => (
            <NoticeCard key={index} notice={notice} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentProfileCard;
