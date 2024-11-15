import TableList from "@/components/TableList";
import { TableCell, TableRow } from "@/components/ui/table";
import { DaysOfWeek, ScheduleHours } from "@/lib/data";
import { SectionSubjectSchedule } from "@/lib/types";

const SchedulTable = ({
  schedules,
}: {
  schedules: SectionSubjectSchedule[];
}) => {
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
    const o: any = { day: day };
    const filteredSchedules = schedules.filter(
      (schedule) => schedule.timeslot?.day === day.toUpperCase()
    );
    filteredSchedules.forEach((sch) => {
      o[sch.timeslot?.hour.toString()!] = sch.subject_name;
    });
    return o;
  });

  const renderRow = (schedule: any) => {
    return (
      <TableRow key={schedule.day}>
        <TableCell className="border">{schedule.day}</TableCell>
        <TableCell className="border">{schedule["1"]}</TableCell>
        <TableCell className="border">{schedule["2"]}</TableCell>
        <TableCell className="border">{schedule["3"]}</TableCell>
        <TableCell className="border">{schedule["4"]}</TableCell>
        <TableCell className="border">{schedule["5"]}</TableCell>
      </TableRow>
    );
  };

  return (
    <div className="min-w-96">
      <TableList columns={colDef} renderRow={renderRow} data={data} />
    </div>
  );
};

export default SchedulTable;
