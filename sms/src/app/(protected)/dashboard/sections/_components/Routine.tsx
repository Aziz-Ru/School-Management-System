"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { DaysOfWeek, Times } from "@/lib/data";
import { Schedule, Subject, Teacher } from "@/utils/types";
import { ColDef } from "ag-grid-community";

import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { createRoutine } from "../_actions/routine";

const Routine = ({
  sectionId,
  schedules,
  teachers,
  subjects,
}: {
  sectionId: string;
  schedules: Schedule[];
  teachers: Teacher[];
  subjects: Subject[];
}) => {
  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  
  const buttonRenderer = (params: any) => {
    return <form></form>;
  };

  const [rowData, setRowData] = useState<Schedule[]>([
    ...Times.map((t) => {
      const obj: any = { time: t.time };
      const days = DaysOfWeek.map((day) => {

        const daySchedule = schedules.find((s) => s.startEnd === t.time);

        if (daySchedule) {
          obj[day] = `${daySchedule.subject!.courseName}`;
        } else {
          obj[day] = "";
        }

      });
      
      return { ...obj, ...days };
    }),
  ]);
  console.log(rowData);
  

  

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subjectId = (e.currentTarget.elements[0] as HTMLSelectElement).value;
    const teacherId = (e.currentTarget.elements[1] as HTMLSelectElement).value;
    const startEnd = (e.currentTarget.elements[2] as HTMLSelectElement).value;
    try {
      const res = await fetch("/api/routine", {
        method: "POST",
        body: JSON.stringify({
          subjectId,
          teacherId,
          startEnd,
          sectionId,
        }),
      });
      const data = await res.json();

      if (data.error) {
        toast({ title: data.error });
      }
      if (data.msg) {
        toast({ title: data.msg });
      }
    } catch (error) {
      toast({ title: "Failed to added" });
    }
  };

  // Define columns for time slots and weekdays

  return (
    <>
      <div
        className="ag-theme-alpine mb-3"
        style={{ height: 350, width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            editable: false,
          }}
          suppressMovableColumns={true} // Disable column dragging
        />
      </div>

      <Card>
        
      </Card>
    </>
  );
};

export default Routine;
