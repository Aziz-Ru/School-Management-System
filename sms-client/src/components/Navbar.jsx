"use client";
import Link from "next/link";
import { useState } from "react";
import menu from "./Menu.json";

const Navbar = () => {
  const [isFocused1, setIsFocused1] = useState({ id: "" });
  const [isFocused2, setIsFocused2] = useState({ id: "" });
  const [isFocused3, setIsFocused3] = useState({ id: "" }); // Add this line
  return (
    <header className="bg-indigo-900 text-white">
      <ul className="flex gap-4 md:gap-8 py-2 font-sans items-center justify-center">
        {menu.map((item1, ind1) => {
          return (
            <li
              key={item1.id}
              className="active:bg-indigo-500 relative hover:bg-indigo-500"
              onMouseOver={() => setIsFocused1({ id: item1.id })}
              onMouseOut={() => setIsFocused1({ id: "" })}
            >
              {item1.path ? (
                <Link href={item1.path} className="font-bold">
                  {item1.title}
                </Link>
              ) : (
                <span className="font-bold">{item1.title}</span>
              )}

              {isFocused1.id === item1.id && (
                <ul className="absolute bg-indigo-900 w-36 ">
                  {item1.children?.map((item2, ind2) => {
                    return (
                      <li
                        className="flex flex-col justify-start px-2 py-2 w-36 border border-gray-300 hover:bg-indigo-500"
                        key={item2.id}
                        onMouseOver={() => setIsFocused2({ id: item2.id })}
                        onMouseOut={() => setIsFocused2({ id: "" })}
                      >
                        {item2.path ? (
                          <Link href={item2.path} className=" w-full">
                            <span className="font-semibold">{item2.title}</span>
                          </Link>
                        ) : (
                          <span className="font-semibold"> {item2.title}</span>
                        )}

                        {isFocused2.id === item2.id && (
                          <ul className="absolute bg-indigo-900 w-24 ml-32 mt-[-10px] flex flex-col justify-start z-10">
                            {item2.children?.map((item3, ind3) => {
                              return (
                                <li
                                  className="pl-2 pr-8 py-2 border border-gray-300 hover:bg-indigo-500"
                                  key={item3.id}
                                  onMouseOver={() =>
                                    setIsFocused3({ id: item3.id })
                                  } // Add this line
                                  onMouseOut={() => setIsFocused3({ id: "" })} // Add this line
                                >
                                  {item3.path ? (
                                    <Link href={item3.path} className="w-full">
                                      <span className="font-semibold">
                                        {item3.title}
                                      </span>
                                    </Link>
                                  ) : (
                                    <span className="font-semibold">
                                      {item3.title}
                                    </span>
                                  )}

                                  {isFocused3.id === item3.id && (
                                    <ul className="absolute bg-indigo-900 mt-[-33px] ml-20 z-50">
                                      {item3.children?.map((item4, ind4) => {
                                        return (
                                          <li
                                            className="px-4 py-2 border border-gray-300 hover:bg-indigo-500 "
                                            key={item4.id}
                                          >
                                            {item4.path ? (
                                              <Link
                                                href={item4.path}
                                                className="font-bold w-full"
                                              >
                                                {item4.title}
                                              </Link>
                                            ) : (
                                              <span className="font-semibold">
                                                {item4.title}
                                              </span>
                                            )}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default Navbar;
