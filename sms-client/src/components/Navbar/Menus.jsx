"use client";
import Link from "next/link";
import { useState } from "react";
import ThreeLineSvg from "../svg/ThreeLineSvg";
import DropdownAcademic from "./DropdownAcademic";
import DropdownAchivement from "./DropdownAchivement";
import DropdownAdmission from "./DropdownAdmission";
import DropdownCoCurricular from "./DropdownCoCurricular";
import DropdownSchool from "./DropdownSchool";
const Menus = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = false;
  return (
    <>
      <div className="flex items-center gap-4 lg:order-2 px-4">
        {!user ? (
          <Link href={"/login"}>
            <div className="bg-blue-600 px-4 py-2 rounded-full text-white text-sm hover:bg-blue-500">
              Login
            </div>
          </Link>
        ) : (
          <Image
            src={"/image/noavatar.png"}
            width={40}
            height={40}
            alt="avatar"
          />
        )}

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
          <ThreeLineSvg />
        </button>
      </div>

      <div
        className={`w-full lg:w-auto lg:order-1 lg:block ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="flex flex-col mt-4 lg:mt-0 lg:flex-row lg:gap-8  ">
          <DropdownSchool />
          <DropdownAcademic />
          <DropdownAchivement />
          <DropdownAdmission />
          <DropdownCoCurricular />
        </div>
      </div>
    </>
  );
};

export default Menus;
