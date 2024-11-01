import { toast } from "@/hooks/use-toast";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

interface StudentAttendanceData {
  Id: string;
  Name: string;
  [key: string]: boolean | string;
}

const AttendenceList = ({
  sectionId,
  studentAttendenceList,
  AttendenceColDefs,
}: {
  sectionId: string;
  studentAttendenceList: StudentAttendanceData[];
  AttendenceColDefs: any[];
}) => {
  const [loading, setLoading] = useState(false);
  const gridHeight = studentAttendenceList.length * 50 + 150;

  const onMarkPresent = async (
    day: string | undefined,
    id: string,
    value: boolean
  ) => {
    if (value) {
      try {
        setLoading(true);
        const currentDate = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);
        const currentDay = new Date(currentDate).toISOString();
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
      } catch (error) {
        toast({
          title: "Failed to mark attendance",
          description: "Please try again",
        });
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const currentDate = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);
        const currentDay = new Date(currentDate).toISOString();
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
      } catch (error) {
        toast({
          title: "Failed to delete attendance",
          description: "Please try again",
        });
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="ag-theme-quartz" style={{ height: `${gridHeight}px` }}>
      <AgGridReact
        suppressMovableColumns={true}
        defaultColDef={{ resizable: false }}
        rowData={studentAttendenceList}
        columnDefs={AttendenceColDefs}
        onCellValueChanged={(e) => {
          onMarkPresent(e.colDef.field, e.data.Id, e.newValue);
        }}
      />
    </div>
  );
};

export default AttendenceList;
