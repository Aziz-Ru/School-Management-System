"use client";

import Link from "next/link";
import { useState } from "react";
import ClickOutSide from "../ClickOutSide";
import DownArrow from "../svg/DownArrow";

const DropdownCoCurricular = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ClickOutSide
      onClick={() => setIsOpen(false)}
      className="relative duration-1000 ease-linear"
    >
      <div
        className={`relative hover:bg-gray-200 dark:hover:bg-gray-700 ${
          isOpen && "bg-gray-200 dark:bg-gray-700"
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-2 py-3 w-full lg:inline-flex flex gap-2 items-center cursor-pointer "
        >
          Co-Curricular
          <DownArrow isOpen={isOpen} />
        </button>
        <ul
          className={`mt-0 lg:mt-4 flex flex-col lg:absolute lg:shadow w-full lg:w-40 site-bg lg:rounded ${
            isOpen ? "" : "hidden"
          }`}
        >
          <li className="hover:bg-gray-200 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-200">
            <Link href={"/bncc"}>
              <div className="px-4 py-3">BNCC</div>
            </Link>
          </li>
          <li className="hover:bg-gray-200 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-200">
            <Link href={"/club"} className="">
              <div className="px-4 py-3">Rover Scout</div>
            </Link>
          </li>
          <li className="hover:bg-gray-200 dark:hover:bg-gray-700 border-b border-gray-300 dark:border-gray-200">
            <Link href={"/game-sports"} className="">
              <div className="px-4 py-3">Game & Sports</div>
            </Link>
          </li>
          <li className="hover:bg-gray-200 dark:hover:bg-gray-700">
            <Link href={"/club"} className="">
              <div className="px-4 py-3">Club</div>
            </Link>
          </li>
        </ul>
      </div>
    </ClickOutSide>
  );
};

export default DropdownCoCurricular;
