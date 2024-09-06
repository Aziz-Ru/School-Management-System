import prisma from "@/lib/db";
import EachSection from "./eachSection";

const GetSection = async () => {
  const sections = await prisma.section.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      sectionName: true,
      year: true,
      classRoom: true,
    },
  });
  const classRooms = await prisma.classRoom.findMany({
    orderBy: { classId: "asc" },
    select: {
      id: true,
      className: true,
    },
  });

  return (
    <div className="site-txt">
      <EachSection classes={classRooms} initialSections={sections} />
    </div>
  );
};

export default GetSection;
