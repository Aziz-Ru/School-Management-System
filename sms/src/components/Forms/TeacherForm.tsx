import Formsubmitbtn from "../Formsubmitbtn";
import Input from "../Input";

const departments = [
  {
    deptName: "Mathematics",
    id: "Mathematics",
  },
];
const TeacherForm = () => {
  return (
    <form className="bg-transparent">
      <div className="my-2">
        <h2 className="text-center text-2xl font-medium">Add New Employee</h2>
      </div>
      <Input type="text" label="Full Name" name="fullName" required={true} />
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
