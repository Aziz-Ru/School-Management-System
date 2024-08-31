"use client";
import { useState } from "react";
import DownArrow from "../svg/DownArrow";

const DropdownAcademic = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className="px-4 py-2 relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className=" flex gap-2 items-center cursor-pointer"
      >
        Academic
        <DownArrow isOpen={false} />
      </div>
      <ul
        className={`px-4 py-3.5 flex flex-col gap-2 lg:absolute lg:w-36 site-bg ${
          isOpen ? "" : "hidden"
        }`}
      >
        <li>Class Teacher</li>
        <li>Class Routine</li>
        <li>Department</li>
        <li>Syllabus</li>
        <li>Facility</li>
      </ul>
    </li>
  );
};

export default DropdownAcademic;
