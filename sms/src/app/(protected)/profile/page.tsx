import NoticeCards from "@/components/NoticeCard";
import Routine from "@/components/teacher/components/Routine";
import { getAttendencCalendar } from "@/lib/utils";
import { decrypt } from "@/session";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { get_notice } from "../../../utils/get_latest_notice";
import { getStudentProile, getTeacherProfile } from "../../../utils/profile";
import { MonthlyAttendance } from "../../../utils/types";
import AttendenceList from "./_components/AttendenceList";
import StudentProfileCard from "./_components/StudentProfileCard";
import TeacherProfileCard from "./_components/TeacherProfileCard";

const ProfilePage = async () => {
  const date = new Date();
  const session = cookies().get("__session")?.value;
  if (!session) {
    notFound();
  }
  const { user } = await decrypt(session);
  if (!user) {
    notFound();
  }

  const uid = user.id ? parseInt(user.id as string) : null;
  if (!uid || isNaN(uid)) {
    notFound();
  }
  const { notices } = await get_notice(3);

  if (user.role === "STUDENT") {
    const { status, student, schedule, attendence } = await getStudentProile(
      uid,
      user.sectionId
    );

    if (status !== 200) {
      notFound();
    }

    const calendar: MonthlyAttendance[] = getAttendencCalendar(attendence!);

    return (
      <div className="flex flex-col xl:flex-row">
        <div className="w-full xl:w-2/3">
          {/* TOP */}
          <div className="flex flex-col lg:flex-row gap-4 p-4">
            {/* User INFO */}
            {student && <StudentProfileCard student={student} />}
          </div>
          {/* Routine */}
          <div className="p-4">
            <h1 className="text-2xl font-semibold mb-2">Routine</h1>
            <Routine schedules={schedule!} />
          </div>
          <div className="">
            <AttendenceList editable={false} rowData={calendar} />
          </div>
        </div>
        <div className="w-full xl:w-1/3 px-4 pt-4">
          <NoticeCards notices={notices} />
        </div>
      </div>
    );
  }
  if (user.role === "TEACHER") {
    const { status, teacher, schedule, attendence } = await getTeacherProfile(
      uid
    );
    if (status !== 200) {
      notFound();
    }

    const calendar: MonthlyAttendance[] = getAttendencCalendar(attendence!);

    return (
      <div className="flex flex-col xl:flex-row">
        <div className="w-full xl:w-2/3">
          {/* TOP */}
          <div className="flex flex-col lg:flex-row gap-4 p-4">
            {/* User INFO */}
            <TeacherProfileCard teacher={teacher!} />
          </div>
          {/* Routine */}
          <div className="p-4">
            <h1 className="text-2xl font-semibold mb-2">Routine</h1>
            <Routine schedules={schedule!} />
          </div>
          <div className="">
            <AttendenceList editable={true} rowData={calendar} />
          </div>
        </div>
        <div className="w-full xl:w-1/3 px-4 pt-4">
          <NoticeCards notices={notices} />
        </div>
      </div>
    );
  }

  notFound();
};

export default ProfilePage;
