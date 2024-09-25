"use client";

import { useState } from "react";
import { MdAdd, MdClose, MdDelete, MdEdit } from "react-icons/md";
import TeacherForm from "./Forms/TeacherForm";

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table: "teacher" | "student" | "class" | "subject";
  type: "add" | "edit" | "delete";
  data?: any;
  id?: number;
}) => {
  const size = type == "add" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type == "add"
      ? "bg-green-500"
      : type == "edit"
      ? "bg-blue-500"
      : "bg-red-500";
  const Icon = type == "add" ? MdAdd : type == "edit" ? MdEdit : MdDelete;

  const [showModal, setShowModal] = useState(false);
  const Form = () => {
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

export default FormModal;
