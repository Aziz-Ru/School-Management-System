"use client";

import { addFaculty } from "@/actions/faculty";
import { useRef } from "react";
import toast from "react-hot-toast";
import Formsubmitbtn from "../Formsubmitbtn";

const AddFaculty = () => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div>
      <div>
        <h1 className="text-center text-2xl font-medium my-2">
          Add New Faculty
        </h1>
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
        <div className="w-full">
          <input
            className="input"
            type="text"
            name="facultyName"
            placeholder="Faculty Name"
          />
        </div>
        <Formsubmitbtn width="" Title="Add Faculty" LoadingTitle="Adding..." />
      </form>
    </div>
  );
};

export default AddFaculty;
