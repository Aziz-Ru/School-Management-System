"use client";
import { toast } from "@/hooks/use-toast";
import { MonthNames } from "@/lib/data";
import { Student, StudentAttendance } from "@/lib/types";
import { CellStyle, ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

const AttendenceList = ({
  sectionId,
  section_attendance,
  students,
  acdemic_year,
}: {
  sectionId: string;
  students: Student[];
  section_attendance: StudentAttendance[];
  acdemic_year: number;
}) => {
  const gridHeight = students.length * 50 + 80;
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [rowData, setRowData] = useState<any[]>([]);
  const [columnDefs, setColDefs] = useState<ColDef[]>([]);

  const onMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  useEffect(() => {
    const date = new Date(acdemic_year, selectedMonth + 1, 0);
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
      ...students.map((student) => {
        const stu: any = {
          Id: student.student_id.toString(),
        };

        days.map((d) => {
          const attendance = section_attendance.find((att) => {
            const attendanceDate = new Date(att.date);
            return (
              attendanceDate.getDate() == d &&
              attendanceDate.getMonth() == selectedMonth &&
              att.student_id == student.student_id &&
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

  const onMarkPresent = async (student_id: string, value: boolean) => {
    try {
      if (value) {
        const response = await fetch(`/api/student-attendence`, {
          method: "POST",
          body: JSON.stringify({
            studentId: student_id,
            sectionId: sectionId,
          }),
        });
        const data = await response.json();
        if (data.msg) {
          toast({ title: `${student_id} id mark as Present` });
        } else if (data.error) {
          toast({ title: data.error });
        }
      } else {
        const response = await fetch(
          `/api/student-attendence?studentId=${student_id}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        if (data.msg) {
          toast({ title: `${student_id} id mark as Absent` });
        } else if (data.error) {
          toast({ title: "Failed to mark this id" });
        }
      }
    } catch (error) {
      toast({ title: "Failed to mark this id" });
    }
  };

  return (
    <div className="">
      <div className="px-1 mb-4">
        <div className="flex gap-4 items-center justify-start ">
          <h2 className="font-bold text-gray-800 text-xl">
            Month: {MonthNames[selectedMonth]}
          </h2>
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
            onMarkPresent(e.data.Id, e.newValue);
          }}
        />
      </div>
    </div>
  );
};

export default AttendenceList;

// const onMarkPresent = async (id: string, value: boolean) => {
//   try {
//     const currentDate = new Date();
//     currentDate.setUTCHours(0, 0, 0, 0);
//     const currentDay = new Date(currentDate).toISOString();
//     setLoading(true);
// if (value) {
//   const response = await fetch(`/api/attendence`, {
//     method: "POST",
//     body: JSON.stringify({
//       studentId: id,
//       sectionId: sectionId,
//     }),
//   });
//   const data = await response.json();

//   if (data.error) {
//     toast({
//       title: data.error,
//     });
//   } else {
//     toast({
//       title: `Attendance marked for ${id}`,
//     });
//   }
// } else {
//   const response = await fetch(
//     `/api/attendence?date=${currentDay}&studentId=${id}&sectionId=${sectionId}`,
//     {
//       method: "DELETE",
//     }
//   );
//   const data = await response.json();
//   if (data.error) {
//     toast({
//       title: "Failed to unmark attendance",
//     });
//   } else {
//     toast({
//       title: `${id} unmarked`,
//     });
//   }
// }
//   } catch (error) {
//     toast({
//       title: "Failed to mark attendance",
//       description: "Please try again",
//     });
//   } finally {
//     setLoading(false);
//   }
// };
