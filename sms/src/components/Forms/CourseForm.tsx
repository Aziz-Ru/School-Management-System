import { addCourse } from "@/actions/course";
import React from "react";
import toast from "react-hot-toast";
import Formsubmitbtn from "../Formsubmitbtn";
import Input from "../Input";

interface ClassFormProps {
  updateModal: () => void;
  data: any;
}

const CourseForm: React.FC<ClassFormProps> = ({ updateModal, data }) => {
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

export default CourseForm;
