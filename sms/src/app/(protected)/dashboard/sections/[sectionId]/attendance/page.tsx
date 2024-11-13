import { get_section_attendance } from "@/lib/controller/get_sections";
import AttendenceList from "../../_components/AttendencList";

const SectionAttendance = async ({
  params,
}: {
  params: { sectionId: string };
}) => {
  const { section, students,section_attendance, status } = await get_section_attendance(
    params.sectionId
  );

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="p-4">
        <AttendenceList
          acdemic_year={section?.academic_year!}
          sectionId={params.sectionId}
          section_attendance={section_attendance!}
          students={students!}
        />
      </div>
    </div>
  );
};

export default SectionAttendance;
