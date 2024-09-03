import prisma from "@/lib/db";
import EachDept from "./EachDept";

const GetDept = async () => {
  const depts = await prisma.department.findMany();
  return (
    <div className="px-4 my-4">
      <div>
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-center">Department</h1>
        </div>
        <EachDept initialDept={depts} />
      </div>
    </div>
  );
};

export default GetDept;
