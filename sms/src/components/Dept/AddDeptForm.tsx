"use client";
import { addDept } from "@/actions/dept";
import { useRef } from "react";
import toast from "react-hot-toast";
import Formsubmitbtn from "../Formsubmitbtn";
interface Props {
  id: string;
  facultyName: string;
}

const AddDeptForm = ({ faculties }: { faculties: Props[] }) => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (FormData) => {
        formRef?.current?.reset();
        const { error, success } = await addDept(FormData);
        if (success) {
          toast.success(success);
        } else {
          toast.error(error);
        }
      }}
    >
      <div className="w-full ">
        <div className="my-4 items-center justify-around flex gap-2">
          <input
            className="w-1/2 site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600"
            type="text"
            name="deptName"
            required
            placeholder="Department Name"
          />
          <select
            name="facultyId"
            className="w-1/2 site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600"
          >
            {faculties.map((faculty) => {
              return (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.facultyName}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <Formsubmitbtn Title="Add" LoadingTitle="Adding..." />
    </form>
  );
};

export default AddDeptForm;
