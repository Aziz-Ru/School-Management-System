"use client";

import React, { useMemo, useState } from "react";
import { MdClose } from "react-icons/md";
import { AddButton, DeleteButton, EditButton } from "./buttons/Buttons";
import { AddStudentForm, DeleteStudentForm } from "./Forms/StudentForm";
import { AddTeacherForm, DeleteTeacherForm } from "./Forms/TeacherForm";

interface FormModalProps {
  table:
    | "teacher"
    | "student"
    | "class"
    | "course"
    | "department"
    | "faculty"
    | "supervisor"
    | "section";
  type: "add" | "edit" | "delete";
  data?: any;
  id?: string | number;
}

const formComponents: Record<
  string,
  Record<string, React.ComponentType<any>>
> = {
  student: {
    add: AddStudentForm,
    delete: DeleteStudentForm,
  },
  teacher: {
    add: (props) => <AddTeacherForm {...props} />,
    delete: DeleteTeacherForm,
  },
};

const FormModal: React.FC<FormModalProps> = ({ table, type, data, id }) => {
  const size = type == "add" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type == "add"
      ? "bg-green-500"
      : type == "edit"
      ? "bg-blue-500"
      : "bg-red-500";

  const Icon =
    type == "add" ? AddButton : type == "edit" ? EditButton : DeleteButton;

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  const SelectedForms = useMemo(() => {
    const tableForms = formComponents[table] || {};
    return tableForms[type] || null;
  }, [table, type]);

  return (
    <>
      <Icon onClick={() => setShowModal(true)} />

      {showModal && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-gray-900 dark:bg-gray-900 text-gray-200 rounded-md p-4 relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] ">
            {SelectedForms ? (
              <SelectedForms
                updateModal={closeModal}
                data={data}
                id={id}
                table={table}
              />
            ) : (
              <p>No Form Available</p>
            )}

            <button
              className="absolute top-4 right-4 cursor-pointer"
              onClick={closeModal}
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

{
  /* {table === "class" && type == "add" ? (
              <AddClassForm updateModal={() => setShowModal(false)} />
            ) : type == "delete" ? (
              <></>
            ) : (
              <></>
            )} */
}

{
  /* {table === "course" && (
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
            )} */
}

{
  /* {table === "student" && type == "add" ? (
              <AddStudentForm />
            ) : type == "delete" ? (
              <DeleteStudentForm table={table} id={id} />
            ) : (
              <></>
            )} */
}

{
  /* {table === "teacher" && type == "add" ? (
              <AddTeacherForm
                data={data}
                updateModal={() => setShowModal(false)}
              />
            ) : (
              type == "delete" &&
              id && <DeleteTeacherForm table={table} id={id} />
            )} */
}
