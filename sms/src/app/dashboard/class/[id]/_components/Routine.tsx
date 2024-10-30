"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useRef, useState } from "react";

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
    time: "2:00 - 3:00 PM",
  },
  {
    time: "3:00 - 4:00 PM",
  },
];

const daysOfWeek = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
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
  const dataFetchedRef = useRef(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filterTeacher = (subjectName: string) => {
    const teacher = teachers.filter((t) =>
      t.courses.some((c) => c.courseName === subjectName)
    );
    setSubjectTeacher(teacher);
  };

  const [rowData, setRowData] = useState<any[]>([]);

  useEffect(() => {
    if (!dataFetchedRef.current) {
      const getData = async () => {
        try {
          const resData = await fetch(
            `/api/routine?sectionId=${sectionId}&classId=${classID}&admin=true`
          );
          const res = await resData.json();
          if (res.data) {
            setRowData(res.data.routine);
            setSubjects(res.data.subjects);
            setTeachers(res.data.teachers);
          }
        } catch (error) {
          console.log(error);
        }
      };
      dataFetchedRef.current = true;
      getData();
    }
  }, [classID, sectionId]);

  useEffect(() => {
    if (subjects.length > 0) {
      filterTeacher(subjects[0].courseName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjects]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subjectId = (e.currentTarget.elements[0] as HTMLSelectElement).value;
    const teacherId = (e.currentTarget.elements[1] as HTMLSelectElement).value;
    const startEnd = (e.currentTarget.elements[2] as HTMLSelectElement).value;
    try {
      const res = await fetch("/api/routine", {
        method: "POST",
        body: JSON.stringify({
          subjectId,
          teacherId,
          startEnd,
          sectionId,
        }),
      });
      const data = await res.json();

      if (data.error) {
        toast({ title: data.error });
      }
      if (data.msg) {
        toast({ title: data.msg });
      }
    } catch (error) {
      toast({ title: "Failed to added" });
    }
  };

  // Define columns for time slots and weekdays
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: "time",
      width: 150,
      pinned: "left",
      cellStyle: { fontWeight: "bold" },
    },
    ...daysOfWeek.map((day) => ({
      field: day,
      width: 150,
      cellStyle: { whiteSpace: "normal" },
    })),
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
              <form
                onSubmit={handleFormSubmit}
                className="flex flex-col w-full gap-3 px-3"
              >
                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="subjectId">
                    Subject
                  </label>
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
                  <label className="font-bold" htmlFor="teacherId">
                    Teacher
                  </label>
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
                  <label className="font-bold" htmlFor="startEnd">
                    Schedule
                  </label>
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
                <Button type="submit">Submit</Button>
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
