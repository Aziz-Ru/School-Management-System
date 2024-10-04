"use client";

import React, { useState } from "react";
import { MdAdd, MdClose, MdDelete, MdEdit } from "react-icons/md";

import ClassForm from "./Forms/ClassForm";
import CourseForm from "./Forms/CourseForm";
import DeptForm from "./Forms/DeptForm";
import FacultyForm from "./Forms/FacultyForm";
import SectionForm from "./Forms/SectionForm";
import TeacherForm from "./Forms/TeacherForm";

interface FormModalProps {
  table:
    | "teacher"
    | "student"
    | "class"
    | "course"
    | "department"
    | "faculty"
    | "section";
  type: "add" | "edit" | "delete";
  data?: any;
  id?: string | number;

}

const FormModal: React.FC<FormModalProps> = ({ table, type, data, id }) => {

  const size = type == "add" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type == "add"
      ? "bg-green-500"
      : type == "edit"
      ? "bg-blue-500"
      : "bg-red-500";
  const Icon = type == "add" ? MdAdd : type == "edit" ? MdEdit : MdDelete;

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`${size} rounded-full flex items-center justify-center ${bgColor}`}
      >
        <Icon className={`${type} site-txt`} />
      </button>

      {showModal && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-gray-900 dark:bg-gray-900 text-gray-200 rounded-md p-4 relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] ">
            {table === "class" && (
              <ClassForm updateModal={() => setShowModal(false)} />
            )}
            {table === "course" && (
              <CourseForm updateModal={() => setShowModal(false)} data={data} />
            )}
            {table === "section" && (
              <SectionForm
                updateModal={() => setShowModal(false)}
                data={data}
              />
            )}
            {table === "faculty" && (
              <FacultyForm updateModal={() => setShowModal(false)} />
            )}
            {table === "department" && (
              <DeptForm updateModal={() => setShowModal(false)} data={data} />
            )}
            {table === "teacher" && (
              <TeacherForm
                data={data}
                updateModal={() => setShowModal(false)}
              />
            )}

            <button
              className="absolute top-4 right-4 cursor-pointer"
              onClick={closeModal}

            <TeacherForm />
            <button
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setShowModal(false)}

            >
              <MdClose className="w-6 h-6 text-white dark:text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const Form: React.FC<FormModalProps> = ({ type, id, table }) => {
  return type == "delete" && id ? (
    <form action="" className="p-4 flex flex-col gap-4">
      <span>
        All data will be lost. Are you sure you want to delete this {table}
        {"? "}
      </span>
      <button className="bg-red-600 rounded-md text-white py-2 px-4 border-none w-max  self-center ">
        Delete
      </button>
    </form>
  ) : (
    <></>
  );
};

export default FormModal;
