"use client";

import { useEffect, useState } from "react";
import ClickoutSide from "../ClickoutSide";
import DownArrow from "../svg/DownArrow";
import NavLink from "./NavLink";

const DropdownCoCurricular = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  }, [isOpen]);

  return (
    <ClickoutSide
      onClick={() => setIsOpen(false)}
      className="relative duration-1000 ease-linear"
    >
      <div
        className={`relative hover:bg-indigo-600 rounded ${
          isOpen && "bg-indigo-700"
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-2 py-2.5 w-full lg:inline-flex flex gap-2 items-center cursor-pointer "
        >
          Co-Curricular
          <DownArrow isOpen={isOpen} />
        </button>
        <ul
          className={`mt-0 lg:mt-4 flex flex-col lg:absolute lg:shadow-lg w-full lg:w-40 bg-indigo-800 lg:rounded ${
            isOpen ? "" : "hidden"
          }`}
        >
          <NavLink path="/bncc" title="BNCC" isLast={false} />
          <NavLink path="/rover-scout" title="Rover Scout" isLast={false} />
          <NavLink path="/game-sports" title="Game & Sports" isLast={false} />
          <NavLink path="/club" title="Club" isLast={true} />
        </ul>
      </div>
    </ClickoutSide>
  );
};

export default DropdownCoCurricular;
