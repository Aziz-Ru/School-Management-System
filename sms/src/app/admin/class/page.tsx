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
    orderBy: {},
  });

  return (
    <div className="w-full site-bg">
      <ClassRoom classrooms={classrooms} />
    </div>
  );
};

export default page;
