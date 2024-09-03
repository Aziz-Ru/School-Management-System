"use client";
import { addSection } from "@/actions/section";
import { useRef } from "react";
import toast from "react-hot-toast";

const Addsection = () => {
  const classRooms = [
    { id: 1, name: "One" },
    { id: 2, name: "Two" },
    { id: 3, name: "Three" },
    { id: 4, name: "Four" },
    { id: 5, name: "Five" },
    { id: 6, name: "Six" },
    { id: 7, name: "Seven" },
    { id: 8, name: "Eight" },
    { id: 9, name: "Nine" },
    { id: 10, name: "Ten" },
    { id: 11, name: "Eleven" },
    { id: 12, name: "Twelve" },
  ];

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="mb-4">
      <form
        ref={formRef}
        action={async (formData: FormData) => {
          formRef.current?.reset();
          const { errors, success } = await addSection(formData);
          if (success) {
            toast.success(success);
          } else {
            console.log(errors);
            toast.error("Failed to added");
          }
        }}
        className="px-2"
      >
        <div className="grid grid-cols-3 sm:flex-row gap-1 sm:gap-2">
          <div className="w-full col-span-3 sm:col-span-1 my-1">
            <input
              type="text"
              name="sectionName"
              placeholder="Section name"
              required
              className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600 "
            />
          </div>
          <div className="w-full col-span-3 sm:col-span-1 flex  my-1">
            <select
              name="classId"
              className="w-1/2  mx-1 site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3.5 px-5 outline-none transition focus:border-blue-600 active:border-blue-600"
            >
              {classRooms.map((classroom) => {
                return (
                  <option
                    key={classroom.id}
                    value={classroom.id}
                    className="site-txt"
                  >
                    {classroom.name}
                  </option>
                );
              })}
            </select>
            <select
              name="year"
              className="w-1/2 site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3.5 px-5 outline-none transition focus:border-blue-600 active:border-blue-600"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          </div>
          <div className="w-full col-span-3 sm:col-span-1 my-1">
            <input
              type="submit"
              value="Add Section"
              className="w-full site-txt bg-blue-600 text-white rounded py-3 px-5 hover:bg-blue-700 transition"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Addsection;
