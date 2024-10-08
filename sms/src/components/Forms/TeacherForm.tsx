"use client";
import { addTeacher, deleteTeacher } from "@/actions/teacher";
import { useState } from "react";
import toast from "react-hot-toast";
import Formsubmitbtn from "../Formsubmitbtn";
import Input from "../Input";

interface DeptFormProps {
  updateModal: () => void;
  data: any[];
}
interface DeptType {
  id: string;
  deptName: string;
  facultyId: string;
}

export const AddTeacherForm: React.FC<DeptFormProps> = ({ updateModal }) => {
  const [deptsData, setDeptsData] = useState<DeptType[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const handleLevel = async (e: any) => {
    if (e.target.value !== "PRIMARY") {
      try {
        setIsDisabled(false);
        const depts = await fetch("/api/list/depts");
        const data = await depts.json();
        setDeptsData(data);
      } catch (error) {
        toast.error("Failed to fetch departments");
      }
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <form
      action={async (formData) => {
        const { error, msg } = await addTeacher(formData);
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
        <h2 className="text-center text-2xl font-medium">Add New Employee</h2>
      </div>
      <div className="mb-2">
        <Input type="text" label="Full Name" name="fullName" required={true} />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1/2">
          <Input type="email" label="Email" name="email" required={true} />
        </div>
        <div className="w-1/2">
          <Input type="phone" label="Phone" name="phone" required={true} />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
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
        <div className="w-1/2">
          <Input type="text" label="Address" name="address" required={true} />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <div className="w-1/2 text-white ">
          <select
            onChange={handleLevel}
            className="w-full text-white  bg-transparent text-sm px-2.5 pb-2.5 pt-4 rounded-lg site-txt border site-border focus:border-gray-200"
            name="level"
            id=""
          >
            <option value="PRIMARY" className="text-black ">
              PRIMARY
            </option>
            <option value="SCHOOL" className="text-black">
              SCHOOL
            </option>
            <option value="COLLEGE" className="text-black">
              COLLEGE
            </option>
          </select>
        </div>
        <div className="w-1/2">
          <select
            className="w-full text-white bg-transparent text-sm px-2.5 pb-2.5 pt-4 rounded-lg site-txt border site-border focus:border-gray-200"
            name="rank"
            id=""
          >
            <option value="Senior" className="text-black">
              Senior
            </option>
            <option value="Assistant" className="text-black ">
              Assistant
            </option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <select
          className="w-full text-white  bg-transparent text-sm px-2.5 pb-2.5 pt-4 rounded-lg site-txt border site-border focus:border-gray-200"
          name="department"
          id=""
          disabled={isDisabled}
        >
          <option value="" className="text-black ">
            Departement
          </option>
          {deptsData.map((dept) => (
            <option key={dept.id} value={dept.id} className="text-black">
              {dept.deptName}
            </option>
          ))}
        </select>
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

export const DeleteTeacherForm = ({
  table,
  id,
}: {
  table: string;
  id?: string | number;
}) => {
  return (
    <form
      action={async (formData: FormData) => {
        const { error, msg } = await deleteTeacher(formData);
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
