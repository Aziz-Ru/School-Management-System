import AddClass from "@/components/class/AddClass";
import ClassRoom from "@/components/class/ClassRoom";

import prisma from "@/lib/db";

const page = async () => {
  const classrooms = await prisma.classRoom.findMany({
    include: {
      _count: {
        select: {
          course: true,
          section: true,
        },
      },
    },
    orderBy: {
      classId: "asc",
    },
  });
  const depts = await prisma.department.findMany({
    select: { deptName: true, id: true },
  });

  return (
    <div className="w-full site-bg">
      {classrooms.length ? (
        <ClassRoom classrooms={classrooms} department={depts} />
      ) : (
        <AddClass />
      )}
    </div>
  );
};

export default page;
