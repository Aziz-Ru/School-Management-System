"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { DaysOfWeek, Times } from "@/lib/data";
import { Schedule, Subject, Teacher } from "@/utils/types";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { createRoutine } from "../_actions/routine";

const Routine = ({
  classID,
  sectionId,
  schedules,
  teachers,
  subjects,
}: {
  classID: number;
  sectionId: string;
  schedules: Schedule[];
  teachers: Teacher[];
  subjects: Subject[];
}) => {
  const [subjectTeacher, setSubjectTeacher] = useState<
    { id: number; fullName: string }[]
  >([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filterTeacher = (subjectName: string) => {
    const teacher = teachers.filter((t) =>
      t.courses!.some((c) => c.courseName === subjectName)
    );
    setSubjectTeacher(teacher);
  };
  const buttonRenderer = (params: any) => {
    return <form></form>;
  };

  const [rowData, setRowData] = useState<Schedule[]>([
    ...Times.map((t) => {
      const obj: any = { time: t.time };
      const days = DaysOfWeek.map((day) => {
        const daySchedule = schedules.find((s) => s.startEnd === t.time);
        if (daySchedule) {
          obj[day] = `${daySchedule.subject!.courseName}`;
        } else {
          obj[day] = "";
        }
      });
      return { ...obj, ...days };
    }),
  ]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: "time",
      width: 150,
      pinned: "left",
      cellStyle: { fontWeight: "bold" },
    },
    {
      field: "Modify",
      width: 100,
      cellRenderer: buttonRenderer,
    },
    ...DaysOfWeek.map((day) => ({
      field: day,
      width: 150,
      cellStyle: { whiteSpace: "normal" },
    })),
  ]);

  useEffect(() => {
    if (subjects.length > 0) {
      filterTeacher(subjects[0].courseName!);
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
                action={async (formData: FormData) => {
                  formData.append("sectionId", sectionId);
                  const { msg, error } = await createRoutine(formData);
                  if (error) {
                    toast({ title: error });
                  }
                  if (msg) {
                    toast({ title: msg });
                  }
                }}
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
                    {Times.map((t) => (
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

export default Routine;
