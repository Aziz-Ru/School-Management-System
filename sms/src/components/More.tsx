"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";

const More = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <div className="relative">
      <div
        className={`w-32 flex flex-col bg-white dark:bg-gray-950 shadow  absolute right-6 rounded py-3 ${
          show ? "block" : "hidden"
        }`}
      >
        <Link href={""} className="hover:bg-sky-50 py-1">
          <span className="px-4 text-md font-medium">View All</span>
        </Link>
        <Link href={""} className="hover:bg-sky-50 py-1">
          <span className="px-4 text-md font-medium">Add</span>
        </Link>
      </div>
      <button onClick={() => setShow((prev) => !prev)}>
        <HiEllipsisVertical className="h-5 w-5" />
      </button>
    </div>
  );
};

export default More;
