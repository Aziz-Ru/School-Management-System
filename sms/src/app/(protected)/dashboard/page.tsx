import RoomTable from "@/components/building/RoomTable";
import AttedanceChart from "@/components/charts/AreaChart";
import EventCalender from "@/components/EventCalender";
import { Card } from "@/components/ui/card";
import { get_dashboard } from "@/lib/controller/get_dashboard";
import { get_rooms } from "@/lib/controller/get_rooms";
import { MonthNames } from "@/lib/data";
import { Status } from "@/lib/types";
import Link from "next/link";

const Page = async () => {
  const today = new Date();
  const { rooms, status } = await get_rooms();
  const {
    notices,
    teacherAttendance,
    studentAttendance,
    studentCount,
    teacherCount,
  } = await get_dashboard();

  const teacherChartData = [];
  const studenceChartData = [];

  for (let i = 0; i <= today.getMonth(); i++) {
    const daysInMonth = new Date(today.getFullYear(), i + 1, 0).getDate() - 8;
    const sta = studentCount ?? 0 * daysInMonth;
    const tta = teacherCount ?? 0 * daysInMonth;
    const tpresent = teacherAttendance?.filter((t) => t.month == i + 1).length;
    const spresent = studentAttendance?.filter((s) => s.month == i + 1).length;

    const tpercentage = ((tpresent ?? 0) / tta).toFixed(2);
    const spercentage = ((spresent ?? 0) / sta).toFixed(2);

    teacherChartData.push({
      month: MonthNames[i],
      present: tpercentage,
    });
    studenceChartData.push({
      month: MonthNames[i],
      present: spercentage,
    });
  }

  return (
    <div className="p-4 gap-4 flex flex-col lg:flex-row">
      <div className="w-full lg:w-2/3">
        <Card className="w-full p-4">
          <h1 className="font-bold text-xl mb-3">Academic Rooms</h1>
          <div className="">
            {status == Status.OK && <RoomTable rooms={rooms!} />}
          </div>
        </Card>
        <div className="h-10"></div>
        <AttedanceChart chartData={teacherChartData} name={"Teachers"} />
        <div className="h-10"></div>
        <AttedanceChart chartData={studenceChartData} name={"Students"} />
      </div>
      {/* Right */}
      <div className="w-full lg:w-1/3 flex flex-col">
        <EventCalender />
        <div className="">
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

export default Page;
