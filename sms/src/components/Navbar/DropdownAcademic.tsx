"use client";
import { useEffect, useState } from "react";
import ClickoutSide from "../ClickoutSide";
import DownArrow from "../svg/DownArrow";
import NavLink from "./NavLink";
const DropdownAcademic = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  }, [isOpen]);
  return (
    <ClickoutSide onClick={() => setIsOpen(false)} className="relative">
      <div
        className={`relative hover:bg-indigo-600  rounded ${
          isOpen && "bg-indigo-600 dark:bg-gray-700"
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-2 py-2.5 w-full lg:inline-flex flex gap-2 items-center cursor-pointer "
        >
          Academic
          <DownArrow isOpen={isOpen} />
        </button>
        <ul
          className={`mt-0 lg:mt-4 flex flex-col lg:absolute lg:shadow-lg w-full lg:w-40 bg-indigo-800 lg:rounded duration-500 transition-opacity ease-in-out ${
            isOpen ? "" : "hidden"
          }`}
        >
          <NavLink path="/home/notices" title="Notices" isLast={false} />
          <NavLink path="/home/syllabus" title="Syllabus" isLast={false} />
          <NavLink
            path="/home/class-teacher"
            title="Class Teacher"
            isLast={false}
          />
          <NavLink
            path="/home/co-ordinator"
            title="Co-Ordinator"
            isLast={false}
          />
          <NavLink path="/home/facilities" title="Facilities" isLast={true} />
        </ul>
      </div>
    </ClickoutSide>
  );
};

export default DropdownAcademic;
