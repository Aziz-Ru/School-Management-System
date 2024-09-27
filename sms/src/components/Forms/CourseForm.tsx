import React from "react";
import Formsubmitbtn from "../Formsubmitbtn";
import Input from "../Input";

interface ClassFormProps {
  updateModal: () => void;
  data: any;
}

const CourseForm: React.FC<ClassFormProps> = (updateModal, data) => {
  console.log(data);
  return (
    <div>
      <h1 className="text-xl text-center font-semibold mb-2">Add New Course</h1>
      <div className="">
        <form action="">
          <Input
            label="Course Name"
            name="courseName"
            type="text"
            required={true}
          />

          {/* {data.department.length > 0 ? (
            <select name="" id="">
              {data.department.map((dept: any) => (
                <option key={dept.id} value={dept.id}>
                  {dept.departmentName}
                </option>
              ))}
            </select>
          ) : (
            ""
          )} */}

          <Formsubmitbtn width="w-full" Title="Add" LoadingTitle="Adding..." />
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
