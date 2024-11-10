import NoticeCards from "@/components/NoticeCard";
import ProfileCard from "@/components/teacher/components/ProfileCard";
import Routine from "@/components/teacher/components/Routine";

import AttendenceList from "@/components/teacher/components/TeacherAttendence";
import { DaysOfWeek, Times } from "@/lib/data";
import { get_notice } from "@/utils/get_latest_notice";
import { getTeacherData } from "@/utils/get_teacherData";
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

  const { teacher, schedule, attendence, status } = await getTeacherData(uid);
  if (status !== Status.OK) {
    notFound();
  }

  const { notices } = await get_notice(3);
  if (!teacher) {
    notFound();
  }

  const routine = DaysOfWeek.map((day) => {
    let obj: any = { Day: day };

    Times.map((t) => {
      const res = schedule?.find(
        (s) => s.day === day.toUpperCase() && s.startEnd === t.time
      );
      obj[t.time] = res
        ? `${res.subject!.courseName}-${res.section?.sectionName}(${
            res.section?.classId
          })`
        : "";
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
    const daysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate();
    let monthData: any = { Month: monthNames[month] };
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
          <ProfileCard teacher={teacher!} />
        </div>
        {/* Routine */}
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-2">Routine</h1>
          <Routine schedules={schedule!} />
        </div>
        <div className="">
          <AttendenceList months={calendar} />
        </div>
      </div>
      <div className="w-full xl:w-1/3 px-4 pt-4">
        <NoticeCards notices={notices} />
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
