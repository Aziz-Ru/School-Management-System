"use client";
import { CellStyle, ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

const TeacherAttendenceList = ({

  attendanceData,
}: {
  attendanceData: any[];
}) => {
  
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [colDef, setColDef] = useState<ColDef[]>([
    {
      headerName: `Month`,
      field: `Month`,
      width: 130,
      pinned: "left",
      editable: false as boolean | ((params: any) => boolean),
    },
    ...days.map((day) => ({
      headerName: `${day}`,
      field: `${day}`,
      width: 50,
      cellStyle: (params: any): CellStyle => {
        return params.value ? { backgroundColor: "#cef9ff" } : {};
      },
    })),
  ]);

  //  const gridHeight = studentAttendenceList.length * 50 + 150;

  //   const onMarkPresent = async (
  //     day: string | undefined,
  //     id: string,
  //     value: boolean
  //   ) => {
  //     if (value) {
  //       try {
  //         setLoading(true);
  //         const currentDate = new Date();
  //         currentDate.setUTCHours(0, 0, 0, 0);
  //         const currentDay = new Date(currentDate).toISOString();
  //         const response = await fetch(`/api/attendence`, {
  //           method: "POST",
  //           body: JSON.stringify({
  //             studentId: id,
  //             date: currentDay,
  //             present: value,
  //             sectionId: sectionId,
  //           }),
  //         });
  //         const data = await response.json();

  //         if (data.error) {
  //           toast({
  //             title: "Failed to mark attendance",
  //           });
  //         } else {
  //           toast({
  //             title: `Attendance marked for ${id}`,
  //           });
  //         }
  //       } catch (error) {
  //         toast({
  //           title: "Failed to mark attendance",
  //           description: "Please try again",
  //         });
  //       } finally {
  //         setLoading(false);
  //       }
  //     } else {
  //       try {
  //         setLoading(true);
  //         const currentDate = new Date();
  //         currentDate.setUTCHours(0, 0, 0, 0);
  //         const currentDay = new Date(currentDate).toISOString();
  //         const response = await fetch(
  //           `/api/attendence?date=${currentDay}&studentId=${id}&sectionId=${sectionId}`,
  //           {
  //             method: "DELETE",
  //           }
  //         );
  //         const data = await response.json();
  //         if (data.error) {
  //           toast({
  //             title: "Failed to unmark attendance",
  //           });
  //         } else {
  //           toast({
  //             title: `${id} unmarked`,
  //           });
  //         }
  //       } catch (error) {
  //         toast({
  //           title: "Failed to delete attendance",
  //           description: "Please try again",
  //         });
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };

  // const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="ag-theme-quartz h-[600px]">
      <AgGridReact
        suppressMovableColumns={true}
        defaultColDef={{
          resizable: false,
          editable: false,
          // editable: (params) =>
          // params.data.Month == MonthNames[currentMonth] &&
          // params.colDef.field == currentDay.toString(),
        }}
        rowData={attendanceData}
        columnDefs={colDef}
        //   onCellValueChanged={(e) => {
        //     onMarkPresent(e.colDef.field, e.data.Id, e.newValue);
        //   }}
      />
    </div>
  );
};

export default TeacherAttendenceList;
