import { addCourse, deleteCourse } from "@/actions/course";
import React from "react";
import toast from "react-hot-toast";
import Formsubmitbtn from "../Formsubmitbtn";
import Input from "../Input";

interface ClassFormProps {
  updateModal: () => void;
  data: any;
}

export const AddCourseForm: React.FC<ClassFormProps> = ({
  updateModal,
  data,
}) => {
  return (
    <div>
      <h1 className="text-xl text-center font-semibold mb-2">Add New Course</h1>
      <div className="">
        <form
          action={async (formData) => {
            const { error, msg } = await addCourse({ formData });
            if (error) {
              toast.error(error);
            } else if (msg) {
              toast.success(msg);
              updateModal();
            }
          }}
        >
          <Input
            label="Course Name"
            name="courseName"
            type="text"
            required={true}
          />
          <input
            type="number"
            name="id"
            defaultValue={data.id}
            className="hidden"
          />

          <Formsubmitbtn width="w-full" Title="Add" LoadingTitle="Adding..." />
        </form>
      </div>
    </div>
  );
};

export const DeleteCourseForm = ({
  table,
  id,
}: {
  table: string;
  id?: string | number;
}) => {
  
  return (
    <form
      action={async (formData: FormData) => {
        const { error, msg } = await deleteCourse(formData);
        if (msg) {
          toast.success(msg);
        } else if (error) {
          toast.error(error);
        }
      }}
      className="p-4 flex flex-col gap-4"
    >
      <span className="text-center">
        All data will be lost. Are you sure you want to delete this {table}
        {"? "}
      </span>
      <input name="id" type="text" defaultValue={id} className="hidden" />
      <input
        type="submit"
        className="bg-red-600 cursor-pointer  rounded-md text-white py-2 px-4 text-center border-none w-fit self-center  focus:outline-none "
        value="Delete"
      />
    </form>
  );
};
