import TableSearch from "@/components/TableSearch";
import { decrypt } from "@/session";
import { getTeacherAttendance } from "@/utils/get_teachers_attendanc";
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

  const teachers = await getTeacherAttendance();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Attendence</h1>
      <div className=" flex flex-col gap-10">
        <div className="">
          <TableSearch />
        </div>
        <div className="">
          <TeacherAttendenceList teachers={teachers} />
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;
