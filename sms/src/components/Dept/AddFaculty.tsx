"use client";

import { addFaculty } from "@/actions/faculty";
import { useRef } from "react";
import toast from "react-hot-toast";
import Formsubmitbtn from "../Formsubmitbtn";

const AddFaculty = () => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div className="px-4 my-4">
      <div>
        <h1 className="text-center text-2xl font-bold my-2">Add Faculty</h1>
      </div>
      <form
        ref={formRef}
        action={async (FormData) => {
          formRef?.current?.reset();
          const { error, success } = await addFaculty(FormData);
          if (success) {
            toast.success(success);
          } else {
            toast.error(error);
          }
        }}
      >
        <div className="w-full my-4">
          <input
            className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-5 outline-none transition focus:border-blue-600 active:border-blue-600"
            type="text"
            name="facultyName"
            placeholder="Faculty Name"
          />
        </div>
        <Formsubmitbtn
          width=""
          Title="Add Faculty"
          LoadingTitle="Adding Faculty"
        />
      </form>
    </div>
  );
};

export default AddFaculty;
