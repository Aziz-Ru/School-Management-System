"use client";
import Annoucement from "@/components/Annoucement";
import EventCalender from "@/components/EventCalender";
import Events from "@/components/Events";
import UserCard from "@/components/UserCard";

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";

const Page = () => {

  
  return (
    <div className="p-4 gap-4 flex flex-col lg:flex-row">
      <div className="w-full lg:w-2/3">
        {/* User cards */}
        <div className="flex  gap-4 justify-around flex-wrap">
          <UserCard type="Teacher" />
          <UserCard type="Student" />
          <UserCard type="Staff" />
        </div>
        <div className="ag-theme-quartz h-screen"></div>
      </div>
      {/* Right */}
      <div className="w-full lg:w-1/3 flex flex-col">
        <EventCalender />
        <Events />
        <Annoucement />
      </div>

      {/* Suggest */}
    </div>
  );
};

export default Page;
