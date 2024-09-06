"use client";
import { addSection } from "@/actions/section";
import { useRef } from "react";
import toast from "react-hot-toast";

interface classRoomProp {
  id: string;
  className: string;
}

const Addsection = ({ Classes }: { Classes: classRoomProp[] }) => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="mb-4">
      <form
        ref={formRef}
        action={async (formData: FormData) => {
          formRef.current?.reset();
          const { error, success } = await addSection(
            formData,
            formData.get("classId") as string
          );
          if (success) {
            toast.success(success);
          } else if (error) {
            toast.error(error);
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
          <div className="w-full col-span-3 sm:col-span-1 my-1">
            <select
              className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600 "
              name="classId"
            >
              {Classes.map((classroom) => {
                return (
                  <option key={classroom.id} value={classroom.id}>
                    {classroom.className}
                  </option>
                );
              })}
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
