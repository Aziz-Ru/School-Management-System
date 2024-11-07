"use client";
import { toast } from "@/hooks/use-toast";
import { Student } from "@/utils/types";
import { getDaysOfCurrentMonth, getPresent } from "@/utils/utilities";
import { CellStyle, ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

const AttendenceList = ({
  sectionId,
  students,
}: {
  sectionId: string;
  students: Student[];
}) => {
  const [loading, setLoading] = useState(false);
  const gridHeight = students.length * 50 + 80;
  const { days } = getDaysOfCurrentMonth();

  const [rowData, setRowData] = useState<any[]>([
    ...students.map((student) => {
      const stu: any = { Id: student.id.toString(), Name: student.fullName };
      days.forEach((day) => {
        stu[`${day}`] = getPresent(
          student!.attendenceList!,
          day,
          new Date().getMonth() + 1
        );
      });
      return stu;
    }),
  ]);

  const [columnDefs, setColDefs] = useState<ColDef[]>([
    { field: "Id", width: 100, editable: false, pinned: "left" },
    { field: "Name", width: 150, editable: false },
    ...days.map((day) => {
      return {
        headerName: `${day}`,
        field: `${day}`,
        width: 50,
        editable: day === new Date().getDate(),
        cellStyle: (params: any): CellStyle => {
          return params.value ? { backgroundColor: "#cef9ff" } : {};
        },
      };
    }),
  ]);

  const onMarkPresent = async (id: string, value: boolean) => {
    try {
      const currentDate = new Date();
      currentDate.setUTCHours(0, 0, 0, 0);
      const currentDay = new Date(currentDate).toISOString();
      setLoading(true);
      if (value) {
        const response = await fetch(`/api/attendence`, {
          method: "POST",
          body: JSON.stringify({
            studentId: id,
            sectionId: sectionId,
          }),
        });
        const data = await response.json();

        if (data.error) {
          toast({
            title: data.error,
          });
        } else {
          toast({
            title: `Attendance marked for ${id}`,
          });
        }
      } else {
        const response = await fetch(
          `/api/attendence?date=${currentDay}&studentId=${id}&sectionId=${sectionId}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        if (data.error) {
          toast({
            title: "Failed to unmark attendance",
          });
        } else {
          toast({
            title: `${id} unmarked`,
          });
        }
      }
    } catch (error) {
      toast({
        title: "Failed to mark attendance",
        description: "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
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
  );
};

export default AttendenceList;
