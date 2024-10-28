import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";

const AttendenceList = ({
  students,
  currentYear,
  currentMonth,
}: {
  students: any;
  currentMonth: number;
  currentYear: number;
}) => {
  const days = new Date(currentYear, currentMonth, 0).getDate();

  const dayArray = useMemo(() => {
    return Array.from({ length: days }, (_, i) => i + 1);
  }, [days]);

  const [rowData, setRowData] = useState<any[]>([]);
  useEffect(() => {
    if (students) {
      const data = students.map((student: any, index: number) => {
        const studentData: any = { ID: student.id, Name: student.fullName };
        dayArray.forEach((day) => {
          studentData[`${day}`] = false;
        });
        return studentData;
      });
      setRowData(data);
    }
  }, [students, dayArray]);

  const rowHeight = 45;
  const gridHeight = useMemo(
    () => rowData.length * rowHeight + 100,
    [rowData.length, rowHeight]
  );

  const [columnDefs, setColDefs] = useState<
    { field: string; width: number; pinned?: string; editable: boolean }[]
  >([
    { field: "ID", width: 100, pinned: "left", editable: false },
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

export default AttendenceList;
