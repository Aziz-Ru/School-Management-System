import EventCalender from "@/components/EventCalender";
import UserCard from "@/components/UserCard";

const page = () => {
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
      </div>
    </div>
  );
};

export default page;
