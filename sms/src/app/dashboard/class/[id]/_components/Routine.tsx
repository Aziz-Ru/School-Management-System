"use client";
import { Card } from "@/components/ui/card";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
const Routine = ({ sectionId }: { sectionId: string }) => {
  useEffect(() => {
    const getData = async () => {
      const resData = await fetch(`/api/class/`);
    };
  }, []);
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
      <Card>
        <div className="my-4">
          <form>
            <h1 className="text-2xl font-bold text-center">Manage Schedule</h1>
            <div className="mt-2">
              <form>
                <div className="flex w-full gap-3 px-3">
                  <div className="w-1/3 flex flex-col">
                    <label htmlFor="subjectId">Subject</label>
                    <select
                      name="subjectId"
                      id="subjectId"
                      className="w-full px-4 py-2 rounded outline-none border border-gray-300 shadow-sm"
                    >
                      <option value="" disabled>
                        Choose Subject
                      </option>
                      <option value="">1</option>
                      <option value="">2</option>
                    </select>
                  </div>
                  <div className="w-1/3 flex flex-col">
                    <label htmlFor="teacherId">Teacher</label>
                    <select
                      name="teacherId"
                      id="teacherId"
                      className="w-full px-4 py-2 rounded outline-none border border-gray-300 shadow-sm"
                    >
                      <option value="" disabled>
                        Choose Teacher
                      </option>
                      <option value="">1</option>
                      <option value="">2</option>
                    </select>
                  </div>
                  <div className="w-1/3 flex flex-col">
                    <label htmlFor="startEnd">Schedule</label>
                    <select
                      name="startEnd"
                      id="startEnd"
                      className="w-full px-4 py-2 rounded outline-none border border-gray-300 shadow-sm"
                    >
                      <option value="" disabled>
                        Choose Time
                      </option>
                      <option value="">1</option>
                      <option value="">2</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </form>
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
