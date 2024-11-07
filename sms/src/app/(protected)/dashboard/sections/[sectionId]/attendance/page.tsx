import { getSectionStudentAttendance } from "@/utils/get_sectionData";
import AttendenceList from "../../_components/AttendencList";

const SectionAttendance = async ({
  params,
}: {
  params: { sectionId: string };
}) => {
  const { students, status } = await getSectionStudentAttendance(
    params.sectionId,
    new Date()
  );

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="p-4">
        <AttendenceList sectionId={params.sectionId} students={students!} />
      </div>
    </div>
  );
};

export default SectionAttendance;
