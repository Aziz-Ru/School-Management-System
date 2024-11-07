import NoticeCards from "@/components/NoticeCard";
import { ChartConfig } from "@/components/ui/chart";
import { MonthNames } from "@/lib/data";
import { get_notice } from "@/utils/get_latest_notice";
import { getSection } from "@/utils/get_sectionData";
import { Status } from "@/utils/types";
import { notFound } from "next/navigation";
import AttendanceChart from "../_components/AttendanceChart";
import StudentList from "../_components/StudentList";

const SectionPage = async ({
  params,
  searchParams,
}: {
  params: { sectionId: string; id: string };
  searchParams: { [key: string]: string };
}) => {
  const date = new Date(searchParams.date).getDate()
    ? new Date(searchParams.date)
    : new Date();

  const { section, students, attendance, status } = await getSection(
    params.sectionId
  );

  if (status !== Status.OK) {
    notFound();
  }
  const { notices } = await get_notice();

  const attdanceData = [];
  for (let i = 0; i < 12; i++) {
    const daysInMonth = new Date(section?.year!, i + 1, 0).getDate();
    const totalPresent = daysInMonth * students?.length!;
    const present = attendance?.filter((att) => att.month == i).length;
    const absent = totalPresent - present!;
    attdanceData.push({
      month: MonthNames[i].substring(0, 3),
      present,
      absent,
    });
  }

  const chartConfig = {
    present: {
      label: "Present",
      color: "hsl(var(--chart-2))",
    },
    absent: {
      label: "Absent",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <div className="p-4 grid grid-cols-12 gap-2">
      {/* Name */}

      <div className="col-span-12 xl:col-span-8">
        <AttendanceChart chartData={attdanceData} chartConfig={chartConfig} />
        <br />
        <StudentList students={students!} classId={section!.classId!} />
      </div>

      {/* Annoucement */}
      <div className="col-span-12 xl:col-span-4">
        <div className="p-1">
          <NoticeCards notices={notices} />
        </div>
      </div>
    </div>
  );
};

export default SectionPage;
