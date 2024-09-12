import AddDept from "@/components/Dept/AddDept";
import AddFaculty from "@/components/Dept/AddFaculty";
import GetDept from "@/components/Dept/GetDept";
import GetFaculty from "@/components/Dept/GetFaculty";

const Department = () => {
  return (
    <section>
      <div className="max-w-screen-2xl mx-auto h-[83vh]">
        <div className="px-4">
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="w-full col-span-2 lg:col-span-1 ">
              <AddFaculty />
              <GetFaculty />
            </div>
            <div className="w-full col-span-2 lg:col-span-1 ">
              <AddDept />
              <GetDept />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Department;
