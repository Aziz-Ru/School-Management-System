"use client";
import { DaysOfWeek, ScheduleHours } from "@/lib/data";

import { SectionSubjectSchedule } from "@/lib/types";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import TableList from "../TableList";
import { TableCell, TableRow } from "../ui/table";

const Schedules = ({ schedules }: { schedules: SectionSubjectSchedule[] }) => {
  const colDef = [
    {
      accessor: "day",
      header: "Days",
      width: 150,
      pinned: "left",
      cellStyle: { fontWeight: "bold" },
    },
    ...ScheduleHours.map((h) => ({
      accessor: h.hour.toString(),
      header: h.name,
    })),
  ];

  const data = DaysOfWeek.map((day) => {
    const o: any = { day: day, id: day };
    const filteredSchedules = schedules.filter(
      (schedule) => schedule.timeslot?.day === day.toUpperCase()
    );

    filteredSchedules.forEach((sch) => {
      o[
        sch.timeslot?.hour.toString()!
      ] = `${sch.subject?.section?.section_name}(${sch.subject?.class_id})`;
    });
    return o;
  });

  const renderRow = (schedule: any) => {
    return (
      <TableRow key={schedule.id}>
        <TableCell className="border">{schedule.day}</TableCell>
        <TableCell className="border">{schedule["1"]}</TableCell>
        <TableCell className="border">{schedule["2"]}</TableCell>
        <TableCell className="border">{schedule["3"]}</TableCell>
        <TableCell className="border">{schedule["4"]}</TableCell>
        <TableCell className="border">{schedule["5"]}</TableCell>
      </TableRow>
    );
  };

  return <TableList columns={colDef} renderRow={renderRow} data={data} />;
};

export default Schedules;
