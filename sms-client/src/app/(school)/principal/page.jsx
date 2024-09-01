"use client";

import { useEffect, useState } from "react";

const Principal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [school, setSchool] = useState({});
  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const res = await fetch("/api/principal");
        const data = await res.json();
        console.log(data);
        setSchool(data);
      } catch (error) {
        console.log("failed to fetch school data");
      }
    };
    fetchSchool();
  }, []);
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-300 px-4 py-1 bg-red-300 rounded"
      >
        Click
      </button>
      {
        <p
          className={`transition delay-1000 duration-1000 ease-in-out ${
            isOpen ? "translate-x-0 block" : "translate-x-2 hidden"
          }`}
        >
          Hello How are you
        </p>
      }
      <div>{school.name}</div>
    </div>
  );
};

export default Principal;
