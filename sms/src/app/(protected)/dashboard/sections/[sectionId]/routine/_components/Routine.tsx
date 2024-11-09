"use client";
import { DaysOfWeek, Times } from "@/lib/data";
import { Schedule, Subject, Teacher } from "@/utils/types";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import RoutineEditForm from "./RoutineEditForm";

const Routine = ({
  schedules,
  teachers,
  subjects,
  sectionId,
}: {
  schedules: Schedule[];
  teachers: Teacher[];
  subjects: Subject[];
  sectionId: string;
}) => {
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: "day",
      width: 150,
      pinned: "left",
      cellStyle: { fontWeight: "bold" },
    },
    ...Times.map((day) => ({
      field: day.time,
      width: 150,
      cellRenderer: (params: any) => {
        const schedule = schedules.find(
          (schedule) =>
            schedule.day === params.data.day.toUpperCase() &&
            schedule.startEnd === params.colDef.field
        );

        return params.value ? (
          <RoutineEditForm
            teachers={teachers}
            sectionId={sectionId}
            subjects={subjects}
            activeSchedule={schedule!}
          />
        ) : (
          ""
        );
      },
    })),
  ]);

  const [rowData, setRowData] = useState([
    ...DaysOfWeek.map((day) => {
      let obj: any = { day: day };
      Times.map((t) => {
        obj[t.time] = schedules.find(
          (schedule) =>
            schedule.day === day.toUpperCase() && schedule.startEnd === t.time
        )?.subject?.courseName;
      });
      return obj;
    }),
  ]);

  return (
    <div className="ag-theme-quartz" style={{ height: 300, width: "100%" }}>
      <AgGridReact
        defaultColDef={{
          sortable: false,
          filter: false,
          resizable: false,
        }}
        columnDefs={columnDefs}
        rowData={rowData}
      />
    </div>
  );
};

export default Routine;
