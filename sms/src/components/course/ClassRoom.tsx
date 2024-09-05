"use client";
import { useState } from "react";
import Formsubmitbtn from "../Formsubmitbtn";
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
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [className, setClassName] = useState("");
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
                    <button
                      onClick={() => {
                        setClassName(classroom.className);
                        setIsCourseOpen(true);
                      }}
                    >
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

      {isCourseOpen && (
        <div className="max-w-screen-xl">
          <form className="px-6 py-4 flex flex-col">
            <div className="text-center mb-2">
              <h1 className="font-bold text-xl">
                Add Course for class {className}
              </h1>
            </div>
            <div className="w-full flex gap-3 justify-around items-center">
              <div className="w-1/3">
                <input
                  className="site-bg rounded border border-gray-700 dark:border-gray-200 py-3 px-4 outline-none transition focus:border-blue-600 active:border-blue-600"
                  type="text"
                  name="courseName"
                  placeholder="Enter Course Name"
                />
              </div>
              <div className="w-1/3">
                <select
                  className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-4 outline-none transition focus:border-blue-600 active:border-blue-600"
                  name="totalMarks"
                >
                  <option value="100">100</option>
                  <option value="75">75</option>
                  <option value="50">50</option>
                  <option value="25">25</option>
                </select>
              </div>
              <Formsubmitbtn Title="Add" LoadingTitle="Adding" width="w-1/3" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ClassRoom;
