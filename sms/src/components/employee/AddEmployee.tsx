"use client";
import { addEmployee } from "@/actions/employee";
import { useState } from "react";
import toast from "react-hot-toast";
import Formsubmitbtn from "../Formsubmitbtn";
import Input from "../Input";
import Select from "../Select";

interface DeptProps {
  id: string;
  value: string;
}

const AddEmployee = ({ departments }: { departments: DeptProps[] }) => {
  const [isStaff, setIsStaff] = useState(false);

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <form
        action={async (formData) => {
          const { error, success } = await addEmployee(formData);
          if (success) {
            toast.success(success);
          } else if (error) {
            toast.error(error);
          }
        }}
      >
        <div className="my-2">
          <h2 className="text-center text-2xl font-medium">Add New Employee</h2>
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="First Name"
            label="First Name"
            name="firstName"
            required={true}
            width="w-1/2"
          />
          <Input
            type="text"
            placeholder="Last Name"
            label="Last Name"
            name="lastName"
            required={true}
            width="w-1/2"
          />
        </div>
        <div className="flex gap-2">
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
            setIsStaff={setIsStaff}
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
            disabled={isStaff}
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
        <Formsubmitbtn LoadingTitle="ADDING..." Title="ADD" width="w-full" />
      </form>
    </div>
  );
};

export default AddEmployee;
