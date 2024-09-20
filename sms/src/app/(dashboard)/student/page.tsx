import Annoucement from "@/components/Annoucement";
import Events from "@/components/Events";
import Routine from "@/components/routine/Routine";

const Student = () => {
  return (
    <div className="p-4 gap-4 flex flex-col xl:flex-row">
      <div className="w-full xl:w-2/3 ">
        <div className=" rounded-md site-bg site-txt p-4">
          <h1 className="text-xl font-semibold mb-4">Schedule ($A)</h1>
          <Routine />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col">
        <Events />
        <Annoucement />
      </div>
    </div>
  );
};

export default Student;
