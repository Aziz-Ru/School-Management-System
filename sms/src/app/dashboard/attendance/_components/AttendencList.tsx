"use client";
import { toast } from "@/hooks/use-toast";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";

interface AttendanceRecord {
  id: string;
  present: boolean;
  date: Date;
  year: number;
}
interface TeacherData {
  id: number;
  fullName: string;
  attendence: AttendanceRecord[] | [];
}

const TeacherAttendenceList = ({ teachers }: { teachers: TeacherData[] }) => {
  const days = new Date().getDate();

  const dayArray = useMemo(() => {
    return Array.from({ length: days }, (_, i) => i + 1);
  }, [days]);

  const [rowData, setRowData] = useState<any[]>([]);
  const getPresent = (attendence: AttendanceRecord[], day: number): boolean => {
    const res = attendence.find((att) => att.date.getDate() == day);
    return res ? true : false;
  };
  useEffect(() => {
    if (teachers) {
      const data = teachers.map((teacher: any, index: number) => {
        const teacherData: any = {
          ID: teacher.id,
          Name: teacher.fullName,
        };
        dayArray.forEach((day) => {
          teacherData[`${day}`] = getPresent(teacher.attendence, day);
        });
        return teacherData;
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

  const onMark = async (teacherId: number, value: boolean) => {
    try {
      if (value) {
        const response = await fetch("/api/tattendence", {
          method: "POST",
          body: JSON.stringify({
            teacherId,
          }),
        });
        const res = await response.json();
        if (res.data) {
          toast({ title: res.data.msg });
        } else {
          toast({ title: "Failed to Marked" });
        }
      } else {
        const response = await fetch(
          `/api/tattendence?teacherId=${teacherId}`,
          {
            method: "DELETE",
          }
        );
        const res = await response.json();
        if (res.data) {
          toast({ title: res.data.msg });
        } else {
          toast({ title: "Failed to Unmarked" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ag-theme-quartz" style={{ height: `${gridHeight}px` }}>
      <AgGridReact
        suppressMovableColumns={true}
        rowData={rowData}
        columnDefs={columnDefs}
        onCellValueChanged={(e) => {
          onMark(e.data.ID, e.value);
        }}
      />
    </div>
  );
};

export default TeacherAttendenceList;
