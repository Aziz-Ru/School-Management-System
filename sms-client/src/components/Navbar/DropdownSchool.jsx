"use client";

import Link from "next/link";
import { useState } from "react";
import ClickOutSide from "../ClickOutSide";
import DownArrow from "../svg/DownArrow";

const DropdownSchool = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ClickOutSide
      onClick={() => setIsOpen(false)}
      className="relative duration-1000 ease-linear"
    >
      <div
        className={`relative hover:bg-gray-200 dark:hover:bg-gray-700 rounded ${
          isOpen && "bg-gray-200 dark:bg-gray-700"
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-2 py-3 w-full lg:inline-flex flex gap-2 items-center cursor-pointer "
        >
          School
          <DownArrow isOpen={isOpen} />
        </button>
        <ul
          className={`mt-0 lg:mt-4 flex flex-col lg:absolute lg:shadow w-full lg:w-40 site-bg lg:rounded ${
            isOpen ? "" : "hidden"
          }`}
        >
          <li className="hover:bg-gray-200 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-200">
            <Link href={"/principal"}>
              <div className="px-4 py-3">Principal</div>
            </Link>
          </li>
          <li className="hover:bg-gray-200 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-200">
            <Link href={"/governing-body"} className="">
              <div className="px-4 py-3">Governing Body</div>
            </Link>
          </li>
          <li className="hover:bg-gray-200 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-200">
            <Link href={"/commitee"} className="">
              <div className="px-4 py-3">Commitee</div>
            </Link>
          </li>
          <li className="hover:bg-gray-200 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-200 lg:border-none">
            <Link href={"/official-staff"} className="">
              <div className="px-4 py-3">Staff</div>
            </Link>
          </li>
        </ul>
      </div>
    </ClickOutSide>
  );
};

export default DropdownSchool;
