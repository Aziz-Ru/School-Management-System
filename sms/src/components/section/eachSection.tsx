"use client";
import { deleteSection, getSection } from "@/actions/section";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
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

      <div className="px-2">
        <div className="table w-full">
          <div className="flex justify-around gap-2 px-4 border rounded border-gray-200 dark:border-gray-600 py-2 ">
            <div className="">Section Name</div>
            <div className="">Class</div>
            <div className="">Year</div>
            <div className="">Delete</div>
          </div>

          <div>
            {sections.map((section) => {
              return (
                <div
                  key={section.id}
                  className="flex items-center justify-around gap-2 px-4 py-1 border border-gray-200 dark:border-gray-600 site-hover"
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
                    className="flex w-full flex-wrap justify-around items-center"
                  >
                    <div>
                      <input
                        type="text"
                        name="sectionName"
                        disabled
                        className="w-32 mx-1 site-bg site-txt rounded py-1.5 px-3 outline-none transition focus:border focus:border-blue-600 active:border-blue-600"
                        defaultValue={section.sectionName}
                      />
                    </div>
                    <div>
                      <span>{section.classRoom.className}</span>
                    </div>
                    <div>
                      <input
                        className="w-16 mx-1 site-bg site-txt rounded py-1.5 px-3 outline-none transition focus:border focus:border-blue-600 active:border-blue-600"
                        name="year"
                        disabled
                        defaultValue={section.year}
                      />
                    </div>
                    <DeleteButton />
                  </form>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachSection;

const DeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <div>
      <input
        className="shadow px-2 py-1.5 bg-black hover:bg-gray-700 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black rounded"
        type="submit"
        aria-disabled={pending}
        value={pending ? "Delete..." : "Delete"}
      />
    </div>
  );
};
