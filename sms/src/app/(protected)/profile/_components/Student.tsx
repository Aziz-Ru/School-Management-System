import Schedules from "@/components/teacher/Schedules";
import TeacherAttendenceList from "@/components/teacher/TeacherAttendence";
import UserProfileCard from "@/components/UserProfileCard";
import { get_student_info } from "@/lib/controller/get_students";
import { MonthNames } from "@/lib/data";
import Link from "next/link";

const Student = async ({ role, id }: { role: string; id: number }) => {
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
          <Schedules schedules={schedules!} />
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
          <div className="mt-3"></div>
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

export default Student;

//   if (status !== 200) {
//     notFound();
//   }

//   const calendar: MonthlyAttendance[] = getAttendencCalendar(attendence!);

//   return (
//     <div className="flex flex-col xl:flex-row">
//       <div className="w-full xl:w-2/3">
//         {/* TOP */}
//         <div className="flex flex-col lg:flex-row gap-4 p-4">
//           {/* User INFO */}
//           {student && <StudentProfileCard student={student} />}
//         </div>
//         {/* Routine */}
//         <div className="p-4">
//           <h1 className="text-2xl font-semibold mb-2">Routine</h1>
//           <Routine schedules={schedule!} />
//         </div>
//         <div className="">
//           <AttendenceList editable={false} rowData={calendar} />
//         </div>
//       </div>
//       <div className="w-full xl:w-1/3 px-4 pt-4">
//         {/* <NoticeCards notices={notices} /> */}
//       </div>
//     </div>
//   );
