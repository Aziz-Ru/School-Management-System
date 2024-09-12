"use client";
import { deleteFaculty, getFaculty } from "@/actions/faculty";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteButton from "../DeleteButton";

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
    <div className="relative">
      <div className="w-full mb-2">
        {/* start search form  */}
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
        {/* end search form  */}
      </div>
      {/* start indivdual faculty  */}
      <div className="w-full mb-2">
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
                <div className="w-1/3 text-start">
                  <span className="w-32site-bg site-txt ">
                    {faculty.facultyName}
                  </span>
                </div>
                <div className="w-1/3 text-center">
                  <Link
                    className="link-btn px-2 py-1"
                    href={`/admin/ds/f/${faculty.id}`}
                  >
                    Visit
                  </Link>
                </div>
                <DeleteButton />
              </form>
              {/* end indivdual faculty  */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EachFaculty;
