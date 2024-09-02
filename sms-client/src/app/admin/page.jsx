import prisma from "@/lib/db";
import Link from "next/link";

const Admin = async () => {
  const classRooms = await prisma.classRoom.findMany();
  return (
    <div>
      <nav>
        <Link className=" p-2 border" href={"/admin/school"}>
          School
        </Link>
        <Link className=" p-2 border" href={"/admin/student"}>
          Student
        </Link>
      </nav>
      <div>
        <ul>
          {classRooms.map((classRoom) => {
            return <li key={classRoom.classId}>{classRoom.className}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
