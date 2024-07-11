"use client";
import { useState } from "react";
import menu from "./Menu.json";
const Navbar = () => {
  const [isFocused, setIsFocused] = useState({
    cpsc: false,
    acdemics: false,
    ct: false,
    ctPrimary: false,
    ctSchool: false,
    ctCollege: false,
    dept: false,
    generalDept: false,
    scienceDept: false,
    humanitisDept: false,
    businessDept: false,
    syllabus: false,
    clasRoutine: false,
  });
  const primay = () => {
    console.log("cti primary");
    setIsFocused({ ...isFocused, ctPrimary: true });
  };

  return (
    <header className="bg-indigo-600 text-white">
      <ul className="flex gap-4">
        {menu.map((item1, index) => {
          return (
            <li key={index}>
              <span>{item1.title}</span>
              <ul className=" absolute bg-indigo-700">
                {item1.children?.map((item2, ind) => {
                  return (
                    <li key={ind} >
                      {item2.title}
                      <ul className="ml-16">
                        {item2.children?.map((item3, ind) => {
                          return (
                            <li key={ind}>
                              {item3.title}
                              <ul className="">
                                {item3.children?.map((item4, ind) => {
                                  return <li key={ind}>{item4.title}</li>;
                                })}
                              </ul>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default Navbar;
