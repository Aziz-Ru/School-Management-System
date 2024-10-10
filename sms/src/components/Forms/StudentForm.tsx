import { addStudent, deleteStudent } from "@/actions/student";
import { useState } from "react";
import toast from "react-hot-toast";
import Formsubmitbtn from "../Formsubmitbtn";
import Input from "../Input";

export const AddStudentForm = ({
  updateModal,
  data,
}: {
  updateModal: () => void;
  data: any;
}) => {
  const [selectedSection, setSelectedSection] = useState(data[0].sections);

  return (
    <form
      action={async (formData) => {
        const { error, msg } = await addStudent(formData);
        if (msg) {
          toast.success(msg);
          updateModal();
        } else if (error) {
          toast.error(error);
        }
      }}
      className="bg-transparent"
    >
      <div className="my-2">
        <h2 className="text-center text-2xl font-medium">
          Register New Student
        </h2>
      </div>
      <div className="mb-2">
        <Input type="text" label="Full Name" name="fullName" required={true} />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1/2">
          <Input type="phone" label="Phone" name="phone" required={false} />
        </div>
        <div className="w-1/2">
          <select
            className="w-full text-white bg-transparent text-sm px-2.5 pb-2.5 pt-4 rounded-lg site-txt border site-border focus:border-gray-200"
            name="sex"
            id=""
          >
            <option value="MALE" className="text-black ">
              MALE
            </option>
            <option value="FEMALE" className="text-black">
              FEMALE
            </option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <div className="w-1/2">
          <Input type="date" label="Date of Birth" name="dob" required={true} />
        </div>
        <div className="w-1/2">
          <Input type="text" label="Address" name="address" required={true} />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <div className="w-1/2 text-white ">
          <select
            className="w-full text-white  bg-transparent text-sm px-2.5 pb-2.5 pt-4 rounded-lg site-txt border site-border focus:border-gray-200"
            onChange={(e) => {
              setSelectedSection(data[e.target.value].sections);
            }}
          >
            {data.map((classData: any, index: number) => {
              return (
                <option className="text-black" key={classData.id} value={index}>
                  {classData.className}
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-1/2">
          <select
            className="w-full text-white bg-transparent text-sm px-2.5 pb-2.5 pt-4 rounded-lg site-txt border site-border focus:border-gray-200"
            name="sectionId"
          >
            {selectedSection.map((section: any) => {
              return (
                <option
                  className="text-black"
                  key={section.id}
                  value={section.id}
                >
                  {section.sectionName}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <div className="w-1/2">
          <Input type="text" label="ID *" name="id" required={true} />
        </div>
        <div className="w-1/2">
          <Input
            type="password"
            label="Password"
            name="password"
            required={true}
          />
        </div>
      </div>

      <Formsubmitbtn LoadingTitle="ADDING..." Title="ADD" width="w-full" />
    </form>
  );
};

export const DeleteStudentForm = ({
  table,
  id,
}: {
  table: string;
  id?: string | number;
}) => {
  console.log(table);
  return (
    <form
      action={async (formData: FormData) => {
        const { error, msg } = await deleteStudent(formData);
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
