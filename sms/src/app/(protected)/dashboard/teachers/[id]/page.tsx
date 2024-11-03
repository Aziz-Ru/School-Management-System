import NoticeCards from "@/components/NoticeCard";
import prisma from "@/lib/db";
import { get_notice } from "@/lib/utils/get_latest_notice";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProfileCard from "../_components/ProfileCard";
import Routine from "../_components/Routine";
import AttendenceList from "../_components/TeacherAttendence";

const TeacherPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string };
}) => {
  const date = searchParams.date ? new Date(searchParams.date) : new Date();
  // console.log(date.toDateString());
  const [teacher, schedule, attendence] = await prisma.$transaction([
    prisma.teacher.findUnique({
      where: {
        id: parseInt(params.id),
      },
      select: {
        id: true,
        fullName: true,
        phone: true,
        img: true,
        email: true,
      },
    }),
    prisma.schedule.findMany({
      where: {
        teacherId: parseInt(params.id),
      },
      select: {
        startEnd: true,
        subject: {
          select: {
            courseName: true,
          },
        },
        section: {
          select: {
            sectionName: true,
            classId: true,
          },
        },
      },
    }),
    prisma.teacherAttendence.findMany({
      where: { teacherId: parseInt(params.id), year: date.getFullYear() },
    }),
  ]);
  const { notices } = await get_notice(3);
  if (!teacher) {
    notFound();
  }

  const routine = times.map((t) => {
    const obj: any = { time: t.time };
    const days = daysOfWeek.map((day) => {
      const daySchedule = schedule.find((s) => s.startEnd === t.time);
      if (daySchedule) {
        obj[day] = `${daySchedule.subject!.courseName}-${
          daySchedule.section!.sectionName
        } -${daySchedule.section!.classId}`;
      } else {
        obj[day] = "";
      }
    });
    return { ...obj, ...days };
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
      const isPresent = getPresent(attendence, day, month);
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
          <ProfileCard teacher={teacher} />
        </div>
        {/* Routine */}
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-2">Routine</h1>
          <Routine rowData={routine} />
        </div>
        <div className="">
          <AttendenceList months={calendar} />
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

const times = [
  {
    time: "10:00 - 11:00 AM",
  },
  {
    time: "11:00 - 12:00 PM",
  },
  {
    time: "12:00 - 1:00 PM",
  },

  {
    time: "2:00 - 3:00 PM",
  },
  {
    time: "3:00 - 4:00 PM",
  },
];
const daysOfWeek = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
];
export default TeacherPage;
