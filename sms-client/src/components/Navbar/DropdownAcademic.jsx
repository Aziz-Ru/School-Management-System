"use client";
import Link from "next/link";
import { useState } from "react";
import ClickOutSide from "../ClickOutSide";
import DownArrow from "../svg/DownArrow";
const DropdownAcademic = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ClickOutSide onClick={() => setIsOpen(false)} className="relative">
      <div
        className={`relative hover:bg-gray-200 dark:hover:bg-gray-700 ${
          isOpen && "bg-gray-200 dark:bg-gray-700"
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-2 py-3 w-full lg:inline-flex flex gap-2 items-center cursor-pointer "
        >
          Academic
          <DownArrow isOpen={isOpen} />
        </button>
        <ul
          className={`mt-0 lg:mt-4 flex flex-col lg:absolute lg:shadow w-full lg:w-40 site-bg lg:rounded duration-500 transition-opacity ease-in-out ${
            isOpen ? "" : "hidden"
          }`}
        >
          <li className="hover:bg-gray-200 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-200">
            <Link href={"/department"}>
              <div className="px-4 py-3">Department</div>
            </Link>
          </li>
          <li className="hover:bg-gray-200 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-200">
            <Link href={"/class-routine"} className="">
              <div className="px-4 py-3">Class Routine</div>
            </Link>
          </li>
          <li className="hover:bg-gray-200 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-200">
            <Link href={"/syllabus"} className="">
              <div className="px-4 py-3">Syllabus</div>
            </Link>
          </li>
          <li className="hover:bg-gray-200 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-200 ">
            <Link href={"/class-teacher"} className="">
              <div className="px-4 py-3">Class Teacher</div>
            </Link>
          </li>
          <li className="hover:bg-gray-200 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-200 ">
            <Link href={"/co-ordinator"} className="">
              <div className="px-4 py-3">Co-Ordinator</div>
            </Link>
          </li>
          <li className="hover:bg-gray-200 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-200 lg:border-none">
            <Link href={"/facilities"} className="">
              <div className="px-4 py-3">Facilities</div>
            </Link>
          </li>
        </ul>
      </div>
    </ClickOutSide>
  );
};

export default DropdownAcademic;
