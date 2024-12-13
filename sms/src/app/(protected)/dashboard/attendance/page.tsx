import { get_teacher_attendance } from "@/lib/controller/get_teachers";
import { Status } from "@/lib/types";
import { decrypt } from "@/session";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import TeacherAttendenceList from "./_components/AttendencList";

const AttendanceList = async () => {
  const cookieStore = cookies();
  const session = cookieStore.get("__session");
  const { user } = await decrypt(session!.value);

  if (user.role !== "ADMIN") {
    notFound();
  }
  const { attendance, status } = await get_teacher_attendance();
  if (status !== Status.OK) {
    notFound();
  }
  console.log(attendance);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Attendence</h1>
      <TeacherAttendenceList attendance={attendance!} />
    </div>
  );
};

export default AttendanceList;
