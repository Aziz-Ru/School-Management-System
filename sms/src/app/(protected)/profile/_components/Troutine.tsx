"use client";
import { DaysOfWeek } from "@/lib/data";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

const TeacherRoutine = ({ rowData }: { rowData: any[] }) => {
  // Define columns for time slots and weekdays
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: "time",
      width: 150,
      pinned: "left",
      cellStyle: { fontWeight: "bold" },
    },
    ...DaysOfWeek.map((day) => ({
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
            resizable: false,
          }}
          suppressMovableColumns={true} // Disable column dragging
        />
      </div>
    </>
  );
};

export default TeacherRoutine;
