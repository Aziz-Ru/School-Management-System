"use client";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
const StudentRoutine = () => {
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
  const columnDefs = [
    {
      field: "time",
      width: 150,
      pinned: "left",
      cellStyle: { fontWeight: "bold" },
    },
    { field: "Saturday", width: 150 },
    { field: "Sunday", width: 150 },
    { field: "Monday", width: 140 },
    { field: "Tuesday", width: 150 },
    { field: "Wednesday", width: 150 },
    { field: "Thursday", width: 150 },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 350, width: "100%" }}>
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
  );
};

export default StudentRoutine;
