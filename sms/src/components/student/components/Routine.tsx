"use client";
import { Times } from "@/lib/data";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
const StudentRoutine = ({ routine }: { routine: any[] }) => {
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: "Day",
      width: 145,
      pinned: "left",
      cellStyle: { fontWeight: "bold" },
    },
    ...Times.map((time) => {
      return { field: time.time, width: 150 };
    }),
  ]);

  return (
    <div className="ag-theme-alpine" style={{ height: 350, width: "100%" }}>
      <AgGridReact
        rowData={routine}
        columnDefs={columnDefs}
        defaultColDef={{
          resizable: false, // Disable column resizing
          editable: false,
        }}
        suppressMovableColumns={true} // Disable column dragging
      />
    </div>
  );
};

export default StudentRoutine;
