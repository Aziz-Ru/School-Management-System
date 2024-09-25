"use client";
import { deleteSection, getSection } from "@/actions/section";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Section {
  id: string;
  sectionName: string;
  year: string;
  classRoom: {
    id: string;
    className: string;
    classId: number;
  };
}
interface ClassProps {
  id: string;
  className: string;
}

const EachSection = ({
  initialSections,
  classes,
}: {
  initialSections: Section[];
  classes: any;
}) => {
  const [isClassActive, setIsClassActive] = useState(false);
  const [isYearActive, setIsYearActive] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  useEffect(() => {
    setSections(initialSections);
  }, [initialSections]);

  const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030];

  return (
    <div>
      {/* Search Form  start*/}
      <form
        action={async (formData) => {
          const data = await getSection(formData);
          setSections(data);
        }}
        className="px-2 mb-4 flex flex-wrap items-center justify-around"
      >
        <input
          type="text"
          name="sectionName"
          placeholder="Search Section"
          className="w-32 mx-1 site-bg site-txt rounded py-1.5 px-3 outline-none transition focus:border focus:border-blue-600 active:border-blue-600 border border-gray-200 dark:border-gray-600"
        />
        <div className="">
          <input
            onChange={() => {
              setIsClassActive(!isClassActive);
            }}
            className="w-5 h-5 outline-none transition focus:border focus:border-blue-600 active:border-blue-600 border border-gray-200 dark:border-gray-600"
            type="checkbox"
          />
          <select
            disabled={!isClassActive}
            className="w-32 mx-1 site-bg site-txt rounded py-2 px-3 outline-none transition focus:border focus:border-blue-600 active:border-blue-600 border border-gray-200 dark:border-gray-600"
            name="classId"
          >
            {classes.map((classroom: ClassProps) => {
              return (
                <option key={classroom.id} value={classroom.id}>
                  {classroom.className}
                </option>
              );
            })}
          </select>
        </div>
        <div className="">
          <input
            onChange={() => {
              setIsYearActive(!isYearActive);
            }}
            className="w-5 h-5 outline-none transition focus:border focus:border-blue-600 active:border-blue-600 border border-gray-200 dark:border-gray-600"
            type="checkbox"
          />
          <select
            name="year"
            disabled={!isYearActive}
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
        </div>

        <input
          type="submit"
          value="filter"
          className="site-txt bg-blue-600 text-white rounded py-1.5 px-5 hover:bg-blue-700 transition"
        />
      </form>
      {/* Search Form  end*/}
      {/* Table  start*/}
      <div className="px-2">
        <div className="table w-full">
          <div className="flex items-center justify-around gap-2 px-4 border rounded border-gray-200 dark:border-gray-600 py-2 ">
            <div className="w-1/5 text-center">Name</div>
            <div className="w-1/5 text-center">Class</div>
            <div className="w-1/5 text-center">Year</div>
            <div className="w-1/5 text-center">Visit</div>
            <div className="w-1/5 text-center">Delete</div>
          </div>

          <div className="w-full">
            {sections.map((section) => {
              return (
                <div
                  key={section.id}
                  className="w-full flex items-center justify-around gap-2 "
                >
                  <form
                    action={async () => {
                      const { error, success } = await deleteSection(
                        section.id
                      );
                      if (success) {
                        toast.success(success);
                      } else {
                        toast.error("Failed to delete");
                      }
                    }}
                    className="flex w-full px-4 gap-2 justify-around items-center py-2 border site-border rounded "
                  >
                    <div className="w-1/5 text-center">
                      <span>{section.sectionName}</span>
                    </div>
                    <div className="w-1/5 text-center">
                      <span>{section.classRoom.className}</span>
                    </div>
                    <div className="w-1/5 text-center">
                      <span>{section.year}</span>
                    </div>
                    <div className="w-1/5 text-center">
                      <Link
                        className="link-btn px-3 py-1"
                        href={`/admin/section/${section.id}`}
                      >
                        Details
                      </Link>
                    </div>
                    <div className="w-1/5 text-center">
                      <input
                        className="delete-btn font-medium px-2 py-1"
                        type="submit"
                        value="Delete"
                      />
                    </div>
                  </form>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Table  end*/}
    </div>
  );
};

export default EachSection;
