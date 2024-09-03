import prisma from "@/lib/db";
import EachFaculty from "./EachFaculty";

const GetFaculty = async () => {
  const faculties = await prisma.faculty.findMany();
  return (
    <div className="px-4 my-4">
      <div>
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-center">Faculty</h1>
        </div>
        <EachFaculty initialFaculties={faculties} />;
      </div>
    </div>
  );
};

export default GetFaculty;
