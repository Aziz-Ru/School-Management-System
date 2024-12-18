import AddRoomForm from "@/components/building/AddRoomForm";
import RoomTable from "@/components/building/RoomTable";
import { Card } from "@/components/ui/card";
import { get_rooms } from "@/lib/controller/get_rooms";
import { Status } from "@/lib/types";

const AcademicRooms = async () => {
  const { rooms, status } = await get_rooms();

  if (status !== Status.OK) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="mx-auto">
      <div className="flex flex-col gap-4 items-start justify-between  p-4 w-full">
        {/* Form */}
        <Card className="w-full border p-3">
          <AddRoomForm />
        </Card>
        {/* View */}
        <Card className="w-full  p-4">
          <h1 className="font-bold text-xl mb-3">Academic Rooms</h1>
          <div className="">
            <RoomTable rooms={rooms!} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AcademicRooms;
