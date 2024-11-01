"use client";
import { toast } from "@/hooks/use-toast";
import { MonthNames } from "@/lib/data";
import { CellStyle, ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useRef, useState } from "react";

const AttendenceList = ({ rowData }: { rowData: any[] }) => {
  const [loading, setLoading] = useState(false);
  const didMountRef = useRef(false);
  const [attendenceCol, setAttendenceCol] = useState<ColDef[]>([
    {
      headerName: `Month`,
      field: `Month`,
      width: 130,
      pinned: "left",
      editable: false as boolean | ((params: any) => boolean),
    },
  ]);

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth(); // 0-based index

  useEffect(() => {
    if (!didMountRef.current) {
      const days = Array.from({ length: 31 }, (_, i) => i + 1);

      const attendenceColDef = days.map((day) => ({
        headerName: `${day}`,
        field: `${day}`,
        width: 50,
        cellStyle: (params: any): CellStyle => {
          return params.value ? { backgroundColor: "#72ff94" } : {};
        },
      }));
      setAttendenceCol((prev) => [...prev, ...attendenceColDef]);
      didMountRef.current = true;
      //   console.log("didMountRef");
    }
  }, []);

  const onMarkPresent = async (value: boolean) => {
    try {
      if (value) {
        const response = await fetch(`/api/profile`, {
          method: "POST",
        });
        const data = await response.json();
        if (response.ok) {
          toast({ title: data.msg });
        } else {
          
          toast({ title: data.error.msg });
        }
      }
    } catch (error: any) {
      toast({ title: error.message });
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="font-bold text-2xl">Attendence</h1>
      </div>
      <div className="ag-theme-quartz h-[600px]">
        <AgGridReact
          suppressMovableColumns={true}
          defaultColDef={{
            resizable: false,
            editable: (params) =>
              params.data.Month == MonthNames[currentMonth] &&
              params.colDef.field == currentDay.toString(),
          }}
          rowData={rowData}
          columnDefs={attendenceCol}
          onCellValueChanged={(e) => {
            onMarkPresent(e.newValue);
          }}
        />
      </div>
    </div>
  );
};

export default AttendenceList;
