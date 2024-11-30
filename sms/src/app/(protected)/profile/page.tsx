import { decrypt } from "@/session";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import StudentProfileCard from "@/components/profile/StudentProfileCard";
import TeacherProfileCard from "@/components/profile/TeacherProfileCard";

const ProfilePage = async () => {
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
  // const { notices } = await get_notice(3);

  if (user.role === "STUDENT") {
    return <StudentProfileCard role="STUDENT" id={uid} />;
  }
  if (user.role === "TEACHER") {
    return <TeacherProfileCard id={uid} />;
  }

  notFound();
};

export default ProfilePage;
