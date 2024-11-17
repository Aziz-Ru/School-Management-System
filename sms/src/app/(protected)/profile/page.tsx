import { decrypt } from "@/session";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import Student from "./_components/Student";
import Teacher from "./_components/Teacher";

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
    return <Student role="STUDENT" id={uid} />;
  }
  if (user.role === "TEACHER") {
    return <Teacher id={uid} />;
  }

  notFound();
};

export default ProfilePage;
