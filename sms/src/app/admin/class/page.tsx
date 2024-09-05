import AddClass from "@/components/class/AddClass";
import ClassRoom from "@/components/course/ClassRoom";
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

  return (
    <div className="w-full site-bg">
      {classrooms.length ? <ClassRoom classrooms={classrooms} /> : <AddClass />}
    </div>
  );
};

export default page;
