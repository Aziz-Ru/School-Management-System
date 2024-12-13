import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { get_section_info } from "@/lib/controller/get_sections";
import { MonthNames } from "@/lib/data";

import AttedanceChart from "@/components/charts/AreaChart";
import { Status } from "@/lib/types";
import { notFound } from "next/navigation";
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

  const { section, students, attendance, section_subjects, status } =
    await get_section_info(params.sectionId);

  if (status !== Status.OK) {
    notFound();
  }

  // const { notices } = await get_notice();

  const attdanceChartData = [];

  for (let i = 0; i < date.getMonth() + 1; i++) {
    const daysInMonth = new Date(section?.academic_year!, i + 1, 0).getDate();
    const totalPresent = daysInMonth * students?.length!;

    const present = attendance?.filter(
      (att) => new Date(att.date).getMonth() == i
    ).length;

    const presentPercentage = ((present ? present : 0) / totalPresent) * 100;

    attdanceChartData.push({
      month: MonthNames[i].substring(0, 3),
      present: presentPercentage,
    });
  }

  return (
    <div className="p-4 grid grid-cols-12 gap-2">
      {/* Name */}

      <div className="col-span-12 xl:col-span-8">
        <AttedanceChart name="Student" chartData={attdanceChartData} />
        <br />
        <StudentList students={students!} classId={section!.class_id!} />
      </div>

      {/* Annoucement */}
      <div className="col-span-12 xl:col-span-4">
        <div className="p-1">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="mb-4">
                Class :{section?.class_id} <span className="w-20"></span>
                Section Name:{section?.section_name}
              </CardTitle>
              <div className="flex flex-wrap gap-3 text-gray-600">
                <p>Academic Year:{section?.academic_year}</p>
                <p>Room Number:{section?.room_number}</p>
                <p>
                  Class Teacher: {section?.teacher?.first_name}{" "}
                  {section?.teacher?.last_name}
                </p>
              </div>
              <CardContent>
                {section_subjects?.length! > 0 &&
                  section_subjects?.map((subject) => {
                    return (
                      <div
                        className="flex justify-between items-center border-y border-gray-200 py-2 text-gray-700"
                        key={subject.subject_name}
                      >
                        <div>{subject.subject_name}</div>
                        <div>
                          {subject.teachers!.first_name}{" "}
                          {subject.teachers!.last_name}
                        </div>
                      </div>
                    );
                  })}
              </CardContent>
            </CardHeader>
          </Card>
          {/* <NoticeCards notices={notices} /> */}
        </div>
      </div>
    </div>
  );
};



export default SectionPage;
