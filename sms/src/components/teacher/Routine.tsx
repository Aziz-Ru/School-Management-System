"use client";
import { DaysOfWeek, Times } from "@/lib/data";
import { Schedule } from "@/utils/types";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

const Routine = ({ schedules }: { schedules: Schedule[] }) => {
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
    })),
  ]);

  const [rowData, setRowData] = useState([
    ...DaysOfWeek.map((day) => {
      let obj: any = { day: day };
      Times.map((t) => {
        const sch = schedules.find(
          (schedule) =>
            schedule.day === day.toUpperCase() && schedule.startEnd === t.time
        );
        obj[t.time] =
          sch !== null && sch !== undefined
            ? `${sch.subject!.courseName} - ${sch!.section!.sectionName}(${
                sch.section?.classId
              })`
            : "";
      });
      return obj;
    }),
  ]);

  return (
    <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
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
