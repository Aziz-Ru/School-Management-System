"use client";
import { Times } from "@/lib/data";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

const Routine = ({ rowData }: { rowData: any[] }) => {
  // Define columns for time slots and weekdays

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
  console.log(columnDefs);

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
            sortable: false,
            filter: false,
          }}
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
