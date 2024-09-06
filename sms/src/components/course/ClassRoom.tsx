"use client";
import { addCourse } from "@/actions/course";
import { addSection } from "@/actions/section";
import { useState } from "react";
import toast from "react-hot-toast";
import Formsubmitbtn from "../Formsubmitbtn";
import AddIcon from "../svg/AddIcon";

interface initialClassRoomProps {
  id: string;
  className: string;
  _count: {
    course: number;
    section: number;
  };
}
interface initialDeptProp {
  id: string;
  deptName: string;
}

const ClassRoom = ({
  classrooms,
  department,
}: {
  classrooms: initialClassRoomProps[];
  department: initialDeptProp[];
}) => {
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [className, setClassName] = useState("");
  const [classId, setClassId] = useState("");
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
                        setIsSectionOpen(false);
                        setClassId(classroom.id);
                      }}
                    >
                      <AddIcon />
                    </button>
                  </div>
                  <div className="w-1/3 flex justify-center items-center gap-4">
                    <span> {classroom._count.section}</span>
                    <button
                      onClick={() => {
                        setClassName(classroom.className);
                        setIsSectionOpen(true);
                        setIsCourseOpen(false);
                        setClassId(classroom.id);
                      }}
                    >
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
          <form
            action={async (formData) => {
              const { error, success } = await addCourse({
                formData,
                classId: classId,
              });
              if (error) {
                toast.error(error);
              } else {
                toast.success(success);
              }
            }}
            className="px-6 py-4 flex flex-col"
          >
            <div className="text-center mb-2">
              <h1 className="font-bold text-xl">
                Add Course for class {className}
              </h1>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-3 justify-around items-center">
              <div className="w-full sm:w-1/4">
                <input
                  className="w-full site-bg rounded border border-gray-700 dark:border-gray-200 py-3 px-4 outline-none transition focus:border-blue-600 active:border-blue-600"
                  type="text"
                  name="courseName"
                  placeholder="Enter Course Name"
                />
              </div>
              <div className="w-full sm:w-1/4">
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
              <div className="w-full sm:w-1/4">
                <select
                  name="deptId"
                  className="w-full site-bg site-txt rounded border border-gray-400 dark:border-gray-300 py-3 px-4 outline-none transition focus:border-blue-600 active:border-blue-600"
                >
                  {department.map((dept, ind: number) => {
                    return (
                      <option key={ind} value={dept.id}>
                        {dept.deptName} Dept
                      </option>
                    );
                  })}
                </select>
              </div>
              <Formsubmitbtn
                Title="Add"
                LoadingTitle="Adding"
                width="w-full sm:w-1/4"
              />
            </div>
          </form>
        </div>
      )}

      {isSectionOpen && (
        <div className="max-w-screen-xl">
          <form
            action={async (formData: FormData) => {
              const { error, success } = await addSection(formData, classId);
              if (error) {
                toast.error(error);
              } else if (success) {
                toast.success(success);
              }
            }}
            className="px-6 py-4 flex flex-col"
          >
            <div className="text-center mb-2">
              <h1 className="font-bold text-xl">
                Add Section for class {className}
              </h1>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-3 justify-around items-center">
              <div className="w-full sm:w-1/2">
                <input
                  className="w-full site-bg rounded border border-gray-700 dark:border-gray-200 py-3 px-4 outline-none transition focus:border-blue-600 active:border-blue-600"
                  type="text"
                  name="sectionName"
                  placeholder="Enter Section Name"
                />
              </div>

              <Formsubmitbtn
                Title="Add"
                LoadingTitle="Adding"
                width="w-full sm:w-1/2"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ClassRoom;
