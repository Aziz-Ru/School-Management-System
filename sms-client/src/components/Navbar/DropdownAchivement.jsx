"use client";
import { useState } from "react";
import DownArrow from "../svg/DownArrow";

const DropdownAchivement = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className="px-4 py-2">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className=" flex gap-2 items-center cursor-pointer"
      >
        Achivements
        <DownArrow isOpen={false} />
      </div>
      <ul
        className={`px-4 lg:px-0 mt-2 flex flex-col gap-2 lg:absolute ${
          isOpen ? "" : "hidden"
        }`}
      >
        <li>Principal</li>
        <li>Governing Body</li>
        <li>Commitee</li>
        <li>Official staff</li>
      </ul>
    </li>
  );
};

export default DropdownAchivement;
