"use client";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

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

const Routine = ({ rowData }: { rowData: any[] }) => {
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
