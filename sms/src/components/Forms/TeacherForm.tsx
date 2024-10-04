"use client";
import { addTeacher } from "@/actions/teacher";
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

const TeacherForm: React.FC<DeptFormProps> = ({ updateModal }) => {
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
        const { error, success } = await addTeacher(formData);
        if (success) {
          toast.success(success);
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
            <option value="SENIOR" className="text-black">
              Senior
            </option>
            <option value="ASSISTANT" className="text-black ">
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

export default TeacherForm;

// action={async (formData) => {
//     const { error, success } = await addEmployee(formData);
//     if (success) {
//       toast.success(success);
//     } else if (error) {
//       toast.error(error);
//     }
//   }}

/**
 * 
 * <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Email"
          label="Email"
          name="email"
          required={true}
          width="w-1/2"
        />
        <Input
          type="number"
          placeholder="Phone Number"
          label="Phone"
          name="phone"
          required={true}
          width="w-1/2"
        />
      </div>
      <div className="flex gap-2">
        <Select
          width="w-1/2"
          label="Sex"
          name="sex"
          options={[
            { id: "Male", value: "Male" },
            { id: "Female", value: "Female" },
          ]}
        />
        <Select
          width="w-1/2"
          label="Role"
          name="role"
          //   setIsStaff={setIsStaff}
          options={[
            { id: "Vice_Principal", value: "Vice_Principal" },
            { id: "Senior_Teacher", value: "Senior_Teacher" },
            { id: "Junior_Teacher", value: "Junior_Teacher" },
            { id: "Assistant_Teacher", value: "Assistant_Teacher" },
            { id: "Office_Staff", value: "Office_Staff" },
          ]}
        />
      </div>
      <div className="flex gap-2">
        <Select
          width="w-1/2"
          label="Department"
          name="department"
          //   disabled={isStaff}
          options={departments}
        />
        <Input
          type="date"
          label="Join Date"
          width="w-1/2"
          placeholder="Join Date"
          name="joinDate"
          required={true}
        />
      </div>
      <div className="flex gap-2">
        <Input
          type="number"
          name="employeeId"
          placeholder="Employee Id"
          label="Employee ID"
          width="w-1/2"
          required={true}
        />
        <Input
          type="text"
          name="password"
          placeholder="Password"
          label="Password"
          width="w-1/2"
          required={true}
        />
      </div>
 */
