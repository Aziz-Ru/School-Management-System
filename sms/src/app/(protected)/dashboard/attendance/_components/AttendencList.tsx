"use client";
import { toast } from "@/hooks/use-toast";
import { MonthNames } from "@/lib/data";
import { Teacher } from "@/lib/types";
import { CellStyle, ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

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

const TeacherAttendenceList = ({ attendance }: { attendance: Teacher[] }) => {
  const gridHeight = attendance.length * 50 + 80;
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [rowData, setRowData] = useState<any[]>([]);
  const [columnDefs, setColDefs] = useState<ColDef[]>([]);

  const onMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  useEffect(() => {
    const date = new Date(new Date().getFullYear(), selectedMonth + 1, 0);
    const currentDate = new Date();
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    setColDefs([
      { field: "Id", width: 100, editable: false, pinned: "left" },
      ...days.map((day) => {
        return {
          headerName: `${day}`,
          field: `${day}`,
          width: 50,
          editable:
            day == currentDate.getDate() &&
            selectedMonth == currentDate.getMonth(),
          cellStyle: (params: any): CellStyle => {
            return params.value ? { backgroundColor: "#cef9ff" } : {};
          },
        };
      }),
    ]);
    setRowData([
      ...attendance.map((teacher) => {
        const stu: any = {
          Id: teacher.teacher_id.toString(),
        };

        days.map((d) => {
          const attendance = teacher.attendance!.find((att) => {
            const attendanceDate = new Date(att.date);
            return (
              attendanceDate.getDate() == d &&
              attendanceDate.getMonth() == selectedMonth &&
              att.status == "PRESENT"
            );
          });
          stu[`${d}`] = attendance ? true : false;
        });
        return stu;
      }),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth]);

  const onMark = async (teacherId: string, value: boolean) => {
    try {
      if (value) {
        const response = await fetch("/api/teacher-attendance", {
          method: "POST",
          body: JSON.stringify({
            teacherId,
          }),
        });
        const res = await response.json();

        if (res.data) {
          toast({ title: res.data.msg });
        } else {
          toast({ title: res.error, variant: "destructive" });
        }
      } else {
        const response = await fetch(
          `/api/teacher-attendance?teacherId=${teacherId}`,
          {
            method: "DELETE",
          }
        );
        const res = await response.json();
        if (res.data) {
          toast({ title: res.data.msg });
        } else {
          toast({ title: "Failed to Unmarked", variant: "destructive" });
        }
      }
    } catch (error) {
      toast({ title: "Failed to mark", variant: "destructive" });
    }
  };

  return (
    <div>
      <div className=" flex flex-col gap-10">
        <div className="">
          <div className="flex gap-3 items-center justify-start ">
            <h2 className="font-bold text-gray-800 text-xl">Month</h2>

            <select
              onChange={onMonthChange}
              value={selectedMonth}
              className="input w-40 text-gray-700"
              name="month_name"
            >
              {MonthNames.map((month, index) => {
                return (
                  <option key={index} value={index}>
                    {month}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="ag-theme-quartz" style={{ height: `${gridHeight}px` }}>
          <AgGridReact
            suppressMovableColumns={true}
            defaultColDef={{
              resizable: false,
            }}
            rowData={rowData}
            columnDefs={columnDefs}
            onCellValueChanged={(e) => {
              onMark(e.data.Id, e.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendenceList;
