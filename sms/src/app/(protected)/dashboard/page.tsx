import RoomTable from "@/components/building/RoomTable";
import EventCalender from "@/components/EventCalender";
import NoticeCards from "@/components/NoticeCard";
import { Card } from "@/components/ui/card";
import UserCard from "@/components/UserCard";
import { get_rooms } from "@/lib/controller/get_rooms";
import { get_notice } from "../../../utils/get_latest_notice";

const Page = async () => {
  const { notices } = await get_notice();
  const { rooms } = await get_rooms();

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
            <RoomTable rooms={rooms!} />
          </div>
        </Card>
      </div>
      {/* Right */}
      <div className="w-full lg:w-1/3 flex flex-col">
        <EventCalender />
        <NoticeCards notices={notices} />
      </div>
    </div>
  );
};

export default Page;
