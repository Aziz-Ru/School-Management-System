"use client";

import { useState } from "react";
import ClickOutSide from "../ClickOutSide";
import DownArrow from "../svg/DownArrow";

const DropdownSchool = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ClickOutSide onClick={() => setIsOpen(false)} className="relative">
      <li className="px-4 py-2 relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-2 py-2 w-full lg:inline-flex flex gap-2 items-center cursor-pointer border"
        >
          School
          <DownArrow isOpen={isOpen} />
        </button>
        <ul
          className={`left-1 px-4 py-2 lg:py-5 mt-0 lg:mt-5 flex flex-col gap-2 lg:absolute w-full lg:w-40 site-bg lg:rounded ${
            isOpen ? "" : "hidden"
          }`}
        >
          <li className="hover:text-gray-400">Principal</li>
          <li>Governing Body</li>
          <li>Commitee</li>
          <li>Official staff</li>
        </ul>
      </li>
    </ClickOutSide>
  );
};

export default DropdownSchool;
