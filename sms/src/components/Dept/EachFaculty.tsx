"use client";
import { deleteFaculty, getFaculty } from "@/actions/faculty";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

interface Props {
  id: string;
  facultyName: string;
}
const EachFaculty = ({ initialFaculties }: { initialFaculties: Props[] }) => {
  const [faculties, setFaculties] = useState<Props[]>([]);
  useEffect(() => {
    setFaculties(initialFaculties);
  }, [initialFaculties]);

  return (
    <div className="border h-72 overflow-y-scroll relative">
      <div className="w-full mb-2">
        <form
          action={async (formData) => {
            const res = await getFaculty(formData);
            setFaculties(res);
          }}
          className="w-full flex justify-around gap-2"
        >
          <input
            className="w-2/3 site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600"
            type="text"
            name="facultyName"
            placeholder="Search Faculty"
          />
          <input
            type="submit"
            value="Search"
            className="w-1/3 shadow px-2 text-white py-2.5 bg-blue-700 hover:bg-blue-600  rounded"
          />
        </form>
      </div>

      {faculties.map((faculty) => {
        return (
          <div
            key={faculty.id}
            className="flex items-center justify-around gap-2 px-4 py-1 border border-gray-200 dark:border-gray-600 site-hover"
          >
            <form
              action={async () => {
                const { error, success } = await deleteFaculty(faculty.id);
                if (success) {
                  toast.success(success);
                } else {
                  toast.error(error);
                }
              }}
              className="flex w-full flex-wrap justify-around items-center"
            >
              <div className="">
                <input
                  type="text"
                  defaultValue={faculty.facultyName}
                  name="facultyName"
                  disabled
                  className="w-32 mx-1 site-bg site-txt rounded py-1.5 px-3 outline-none transition focus:border focus:border-blue-600 active:border-blue-600"
                />
              </div>
              <DeleteButton />
            </form>
          </div>
        );
      })}
    </div>
  );
};

export default EachFaculty;

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
