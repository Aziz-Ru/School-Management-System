"use client";
import AddIcon from "../svg/AddIcon";

interface initialProps {
  id: string;
  className: string;
  _count: {
    course: number;
    section: number;
  };
}

const ClassRoom = ({ classrooms }: { classrooms: initialProps[] }) => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="px-6 flex flex-col ">
        <div className="">
          <h1 className="text-2xl site-txt font-bold text-center my-2">
            Class
          </h1>
        </div>
        <div className="">
          <div className="border border-gray-200 dark:border-gray-700  p-2 my-1 rounded">
            <div className="flex justify-around items-center">
              <div className="">Class Name</div>
              <div className="">Courses </div>
              <div className="">Sections </div>
            </div>
          </div>
          {classrooms.map((classroom) => {
            return (
              <div
                key={classroom.id}
                className="border border-gray-200 dark:border-gray-700  p-2 my-1 rounded"
              >
                <div className="flex justify-around items-center">
                  <div className="w-1/3 text-center">
                    <span>{classroom.className}</span>
                  </div>
                  <div className="w-1/3 flex justify-center items-center gap-4">
                    <span>{classroom._count.course}</span>
                    <button>
                      <AddIcon />
                    </button>
                  </div>
                  <div className="w-1/3 flex justify-center items-center gap-4">
                    <span> {classroom._count.section}</span>
                    <button>
                      <AddIcon />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="absolute mx-auto top-1/4 max-w-screen-sm border">
        <form>
          <div className="w-full">
            <input
              className="w-full"
              type="text"
              placeholder="Enter Course Name"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassRoom;
