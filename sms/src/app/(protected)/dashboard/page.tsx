import RoomTable from "@/components/building/RoomTable";
import EventCalender from "@/components/EventCalender";
import { Card } from "@/components/ui/card";
import UserCard from "@/components/UserCard";
import { get_notices } from "@/lib/controller/get_notices";
import { get_rooms } from "@/lib/controller/get_rooms";
import { Status } from "@/lib/types";
import Link from "next/link";

const Page = async () => {
  const { rooms, status } = await get_rooms();
  const { notices } = await get_notices({ take: 5 });
  return (
    <div className="p-4 gap-4 flex flex-col lg:flex-row">
      <div className="w-full lg:w-2/3">
        {/* User cards */}
        <div className="flex  gap-4 justify-around flex-wrap mb-4">
          <UserCard type="Teacher" />
          <UserCard type="Student" />
          <UserCard type="Staff" />
        </div>

        <Card className="w-full p-4">
          <h1 className="font-bold text-xl mb-3">Academic Rooms</h1>
          <div className="">
            {status == Status.OK && <RoomTable rooms={rooms!} />}
          </div>
        </Card>
      </div>
      {/* Right */}
      <div className="w-full lg:w-1/3 flex flex-col">
        <EventCalender />
        <div className="">
          {notices!.map((notice) => (
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
