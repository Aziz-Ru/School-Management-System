"use client";
import { Card } from "@/components/ui/card";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

const times = [
  {
    time: "10:00 - 11:00 AM",
  },
  {
    time: "11:00 - 12:00 PM",
  },
  {
    time: "12:00 - 1:00 PM",
  },
  {
    time: "1:00 - 2:00 PM",
  },
  {
    time: "2:00 - 3:00 PM",
  },
  {
    time: "3:00 - 4:00 PM",
  },
];

const Routine = ({
  classID,
  sectionId,
}: {
  classID: number;
  sectionId: string;
}) => {
  const [teachers, setTeachers] = useState<
    { id: number; fullName: string; courses: { courseName: string }[] }[]
  >([]);
  const [subjects, setSubjects] = useState<
    { id: string; courseName: string }[]
  >([]);
  const [subjectTeacher, setSubjectTeacher] = useState<
    { id: number; fullName: string }[]
  >([]);

  useEffect(() => {
    const getData = async () => {
      const resData = await fetch(`/api/class/${classID}/${sectionId}`);
      const res = await resData.json();
      setSubjects(res.data.subjects);
      setTeachers(res.data.teachers);
    };
    getData();
  }, [classID, sectionId]);

  const filterTeacher = (subjectName: string) => {
    const teacher = teachers.filter((t) =>
      t.courses.some((c) => c.courseName === subjectName)
    );
    setSubjectTeacher(teacher);
  };

  // Define time slots and columns for weekdays
  const rowData = [
    {
      time: "10:00 - 11:00 AM",
    },
    {
      time: "11:00 - 12:00 PM",
    },
    {
      time: "12:00 - 1:00 PM",
    },
    {
      time: "1:00 - 2:00 PM",
    },
    {
      time: "2:00 - 3:00 PM",
    },
    {
      time: "3:00 - 4:00 PM",
    },
  ];
  // Define columns for time slots and weekdays
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: "time",
      width: 150,
      pinned: "left",
      cellStyle: { fontWeight: "bold" },
    },

    { field: "Saturday", width: 150 },
    { field: "Sunday", width: 150 },
    { field: "Monday", width: 150 },
    { field: "Tuesday", width: 150 },
    { field: "Wednesday", width: 150 },
    { field: "Thursday", width: 150 },
  ]);

  return (
    <>
      <div
        className="ag-theme-alpine mb-3"
        style={{ height: 350, width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            resizable: false, // Disable column resizing
            editable: false,
          }}
          suppressMovableColumns={true} // Disable column dragging
        />
      </div>
      <Card>
        <div className="my-4  justify-center items-center flex">
          <div className="w-[400px] ">
            <h1 className="text-2xl font-bold text-center">Manage Schedule</h1>
            <div className="mt-2 w-full ">
              <form className="flex flex-col w-full gap-3 px-3">
                <div className="flex flex-col">
                  <label htmlFor="subjectId">Subject</label>
                  <select
                    onChange={(e) =>
                      filterTeacher(
                        e.target.options[e.target.selectedIndex].text
                      )
                    }
                    name="subjectId"
                    id="subjectId"
                    className="w-full px-4 py-2 rounded bg-transparent outline-none border border-gray-300 shadow-sm"
                  >
                    <option value="" disabled>
                      Choose Subject
                    </option>
                    {subjects.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.courseName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="teacherId">Teacher</label>
                  <select
                    name="teacherId"
                    id="teacherId"
                    className="w-full px-4 py-2 rounded outline-none bg-transparent border border-gray-300 shadow-sm"
                  >
                    <option value="" disabled>
                      Choose Teacher
                    </option>
                    {subjectTeacher.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.fullName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="startEnd">Schedule</label>
                  <select
                    name="startEnd"
                    id="startEnd"
                    className="w-full px-4 py-2 rounded outline-none border bg-transparent border-gray-300 shadow-sm"
                  >
                    <option value="" disabled>
                      Choose Time
                    </option>
                    {times.map((t) => (
                      <option key={t.time} value={t.time}>
                        {t.time}
                      </option>
                    ))}
                  </select>
                </div>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

const RoutineForm = () => {
  return (
    <form className="flex flex-col  p-1">
      <div className="">
        <select name="" id="" className="w-20 px-4 py-1">
          <option value="">1</option>
          <option value="">2</option>
        </select>
        <select name="" id="" className="w-20 px-4 py-1">
          <option value="">A</option>
          <option value="">B</option>
        </select>
      </div>
      <input type="submit" value="Add" className="text-black border" />
    </form>
  );
};
export default Routine;
