"use client";

import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState(true);
  const [sections, setSections] = useState([]);
  const [defaultValue, setDefaultValue] = useState("TEST");

  const handleChange = async (e: any) => {
    if (status) {
      try {
        setStatus(false);
        const data = await fetch("/api/admin/section", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sectionName: e.target.value }),
        });
        const res = await data.json();
        setSections(res);
        setStatus(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main>
      <h1>HI</h1>

      <input
        type="text"
        defaultValue={defaultValue}
        onClick={() => setDefaultValue("")}
        onChange={handleChange}
        className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600"
      />
    </main>
  );
}
