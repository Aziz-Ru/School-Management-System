"use client";
import { useEffect, useState } from "react";
import DeleteIcon from "../svg/DeleteIcon";
import EditIcon from "../svg/EditIcon";

interface Section {
  id: string;
  sectionName: string;
  year: string;
  classId: string;
}

const EachSection = () => {
  const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030];
  const classes = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const [sections, setSection] = useState<Section[]>([]);

  const handleFilter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const classId = formData.get("classId");
    const year = formData.get("year");
    const sectionName = formData.get("sectionName");
    try {
      const res = await fetch(
        `/api/admin/section?${sectionName ? `sn=${sectionName}&` : ""}${
          classId ? `cd=${classId}&` : ""
        }${year ? `y=${year}` : ""}`
      );
      const data = await res.json();
      setSection(data);
    } catch (error) {}
  };

  useEffect(() => {
    const getSection = async () => {
      const res = await fetch("/api/admin/section");
      const data = await res.json();
      console.log(data);
      setSection(data);
    };
    getSection();
  }, []);

  return (
    <div>
      <form onSubmit={handleFilter} className="px-2 mb-4">
        <input
          type="text"
          name="sectionName"
          placeholder="Search Section"
          className="w-32 mx-1 site-bg site-txt rounded py-1.5 px-3 outline-none transition focus:border focus:border-blue-600 active:border-blue-600 border border-gray-200 dark:border-gray-600"
        />
        <select
          className="w-32 mx-1 site-bg site-txt rounded py-2 px-3 outline-none transition focus:border focus:border-blue-600 active:border-blue-600 border border-gray-200 dark:border-gray-600"
          name="classId"
        >
          {classes.map((classroom) => {
            return (
              <option key={classroom} value={classroom}>
                {classroom}
              </option>
            );
          })}
        </select>
        <select
          name="year"
          className="w-32 mx-1 site-bg site-txt rounded py-2 px-3 outline-none transition focus:border focus:border-blue-600 active:border-blue-600 border border-gray-200 dark:border-gray-600"
        >
          {years.map((year) => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        <input
          type="submit"
          value="filter"
          className="site-txt bg-blue-600 text-white rounded py-1.5 px-5 hover:bg-blue-700 transition"
        />
      </form>

      <form className="px-2">
        <table className="table w-full">
          <thead>
            <tr className="flex justify-around gap-2 px-4 border border-gray-200 dark:border-gray-600 py-2 ">
              <td>Section Name</td>
              <td>Class</td>
              <td>Year</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => {
              return (
                <tr
                  key={section.id}
                  className="flex items-center justify-around gap-2 px-4 py-1 border border-gray-200 dark:border-gray-600 site-hover"
                >
                  <td>
                    <input
                      type="text"
                      name="sectionName"
                      className="w-32 mx-1 site-bg site-txt rounded py-1.5 px-3 outline-none transition focus:border focus:border-blue-600 active:border-blue-600"
                      defaultValue={section.sectionName}
                    />
                  </td>
                  <td>
                    <span>{section.classId}</span>
                  </td>
                  <td>
                    <input
                      className="w-16 mx-1 site-bg site-txt rounded py-1.5 px-3 outline-none transition focus:border focus:border-blue-600 active:border-blue-600"
                      name="year"
                      defaultValue={section.year}
                    />
                  </td>
                  <td>
                    <button>
                      <EditIcon />
                    </button>
                  </td>
                  <td>
                    <button>
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>

      {/* <div className="absolute rounded left-1/2 top-1/2  flex justify-center items-center dark:text-gray-800 text-gray-200 bg-gray-700 dark:bg-gray-200 ">
        <div className="px-4 py-3">
          <h3 className="text-xl font-extrabold">Do You Want to Delete This</h3>
          <div className="flex justify-between my-2">
            <button className="px-3 py-2 border bg-green-600 rounded shadow ">
              Cancel
            </button>
            <button className="px-3 py-2 border bg-red-600 rounded shadow ">
              Delete
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default EachSection;
