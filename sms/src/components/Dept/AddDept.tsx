import prisma from "@/lib/db";
import AddDeptForm from "./AddDeptForm";

const AddDept = async () => {
  const faculty = await prisma.faculty.findMany();
  return (
    <div className="my-1">
      <div>
        <h1 className="text-center text-2xl font-bold my-2">
          Add New Department
        </h1>
      </div>
      <AddDeptForm faculties={faculty} />
    </div>
  );
};

export default AddDept;
