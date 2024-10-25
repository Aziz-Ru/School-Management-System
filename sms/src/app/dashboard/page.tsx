import Annoucement from "@/components/Annoucement";
import EventCalender from "@/components/EventCalender";
import Events from "@/components/Events";
import UserCard from "@/components/UserCard";
import prisma from "@/lib/db";
import Link from "next/link";

const page = async () => {
  const numsOfClass = await prisma.class.count();

  return (
    <div className="p-4 gap-4 flex flex-col lg:flex-row">
      
      <div className="w-full lg:w-2/3">
        {/* User cards */}
        <div className="flex gap-4 justify-around flex-wrap">
          <UserCard type="Teacher" />
          <UserCard type="Student" />
          <UserCard type="Staff" />
        </div>
      </div>

      {/* Right */}
      <div className="w-full lg:w-1/3 flex flex-col">
        <EventCalender />
        <Events />
        <Annoucement />
      </div>
      {/* Suggest */}
      {numsOfClass == 0 ? (
        <div className="absolute right-10 bottom-10">
          <Link
            className="bg-sky-500 px-6 py-2 rounded-full text-gray-300"
            href={"/list/cls"}
          >
            Add Class
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default page;
