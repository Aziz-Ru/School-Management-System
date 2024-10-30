"use client";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useRef, useState } from "react";

interface StudentAttendanceData {
  Id: string;
  Name: string;
  [key: string]: boolean | string;
}

const AttendenceList = ({ months }: { months: any[] }) => {
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
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (!didMountRef.current) {
      const days = Array.from({ length: 31 }, (_, i) => i + 1);

      const attendenceColDef = days.map((day) => ({
        headerName: `${day}`,
        field: `${day}`,
        width: 50,
      }));
      setAttendenceCol((prev) => [...prev, ...attendenceColDef]);
      didMountRef.current = true;
      //   console.log("didMountRef");
    }
  }, []);
  //   const gridHeight = studentAttendenceList.length * 50 + 150;

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

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

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
              params.data.Month == monthNames[currentMonth] &&
              params.colDef.field == currentDay.toString(),
          }}
          rowData={months}
          columnDefs={attendenceCol}
          //   onCellValueChanged={(e) => {
          //     onMarkPresent(e.colDef.field, e.data.Id, e.newValue);
          //   }}
        />
      </div>
    </div>
  );
};

export default AttendenceList;
