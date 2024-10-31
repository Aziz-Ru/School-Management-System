"use client";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";
const TeacherAttendenceList = ({ teachers }: { teachers: any }) => {
  const days = new Date(2024, 10, 0).getDate();

  const dayArray = useMemo(() => {
    return Array.from({ length: days }, (_, i) => i + 1);
  }, [days]);

  const [rowData, setRowData] = useState<any[]>([]);
  useEffect(() => {
    if (teachers) {
      const data = teachers.map((teacher: any, index: number) => {
        const studentData: any = { ID: teacher.id, Name: teacher.fullName };
        dayArray.forEach((day) => {
          studentData[`${day}`] = false;
        });
        return studentData;
      });
      setRowData(data);
    }
  }, [dayArray, teachers]);

  const rowHeight = 45;
  const gridHeight = useMemo(
    () => rowData.length * rowHeight + 100,
    [rowData.length, rowHeight]
  );

  const [columnDefs, setColDefs] = useState<ColDef[]>([
    { field: "ID", width: 100, editable: false, pinned: "left" },
    { field: "Name", width: 150, editable: false },
  ]);

  useEffect(() => {
    if (columnDefs.length == 2) {
      const dayColumns = dayArray.map((day) => {
        return {
          field: `${day}`,
          width: 50,
          editable: new Date().getDate() === day,
        };
      });
      setColDefs([...columnDefs, ...dayColumns]);
    }
  }, [columnDefs, dayArray]); // Run only once

  const getPresent = (attdence: any[], day: number): boolean => {
    return false;
  };
  return (
    // style={{ height: `${gridHeight}px` }}
    <div className="ag-theme-quartz" style={{ height: `${gridHeight}px` }}>
      <AgGridReact
        suppressMovableColumns={true}
        rowData={rowData}
        columnDefs={columnDefs}
        onCellValueChanged={(e) => {
          console.log(e.colDef.field, e.data.ID, e.data.Name, e.value);
        }}
      />
    </div>
  );
};

export default TeacherAttendenceList;
