import AddDept from "@/components/Dept/AddDept";
import AddFaculty from "@/components/Dept/AddFaculty";
import GetDept from "@/components/Dept/GetDept";
import GetFaculty from "@/components/Dept/GetFaculty";

const Department = () => {
  return (
    <section>
      <div className="max-w-screen-2xl  mx-auto">
        <div className="">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 ">
              <AddFaculty />
            </div>
            <div className=" col-span-12 md:col-span-6 ">
              <GetFaculty />
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 ">
              <AddDept />
            </div>
            <div className="col-span-12 md:col-span-6 ">
              <GetDept />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Department;
