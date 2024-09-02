"use client";
import { useState } from "react";
import ClickoutSide from "../ClickoutSide";
import DownArrow from "../svg/DownArrow";
import NavLink from "./NavLink";

const DropdownAchivement = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ClickoutSide
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
          className="px-2 py-2.5 w-full lg:inline-flex flex gap-2 items-center cursor-pointer "
        >
          Achivements
          <DownArrow isOpen={isOpen} />
        </button>
        <ul
          className={`mt-0 lg:mt-4 flex flex-col lg:absolute lg:shadow-lg w-full lg:w-40 site-bg lg:rounded ${
            isOpen ? "" : "hidden"
          }`}
        >
          <NavLink path="/board-result" title="Board Result" isLast={false} />
          <NavLink
            path="/academic-result"
            title="Academic Result"
            isLast={false}
          />
          <NavLink path="/co-curricular" title="Co-Curricular" isLast={true} />
        </ul>
      </div>
    </ClickoutSide>
  );
};

export default DropdownAchivement;
