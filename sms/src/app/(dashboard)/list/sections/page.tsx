import Annoucement from "@/components/Annoucement";

const columns = [
  {
    header: "Course Name",
    accessor: "courseName",
  },
  {
    header: "Teacher",
    accessor: "sections",
    className: "hidden sm:table-cell",
  },
];

const Section = async () => {
  return (
    <div className="flex flex-col xl:flex-row">
      <div className="w-full xl:w-2/3 p-2">
        <div className="flex items-center justify-between px-1 relative">
          <h1 className="text-2xl font-semibold ">Routine</h1>
        </div>
      </div>
      <div className="w-full xl:w-1/3">
        <Annoucement />
      </div>
    </div>
  );
};

export default Section;
