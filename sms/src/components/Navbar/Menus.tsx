"use client";

import { useEffect, useState } from "react";
import SignInForm from "../Forms/SignInForm";
import ThreeLineSvg from "../svg/ThreeLineSvg";
import DropdownAcademic from "./DropdownAcademic";
import DropdownAchivement from "./DropdownAchivement";
import DropdownAdmission from "./DropdownAdmission";
import DropdownCoCurricular from "./DropdownCoCurricular";
import DropdownSchool from "./DropdownSchool";

const Menus = ({isLoggedIn}:{isLoggedIn:boolean}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 5000);
    }
  }, [isOpen]);

  return (
    <>
      <div className="flex items-center gap-4 lg:order-2 px-4">
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
          <ThreeLineSvg />
        </button>
      </div>
      <div
        className={`w-full lg:w-auto lg:order-1 lg:block ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="flex flex-col items-center mt-4 lg:mt-0 lg:flex-row lg:gap-8  ">
          <DropdownSchool />
          <DropdownAcademic />
          <DropdownAchivement />
          <DropdownAdmission />
          <DropdownCoCurricular />
          {!isLoggedIn && <SignInForm />}
        </div>
      </div>
    </>
  );
};

export default Menus;
