import prisma from "@/lib/db";
import ClassList from "./_components/ClassList";

const ClassListPage = async () => {
  const classList = await prisma.class.findMany({
    include: { _count: { select: { sections: true, course: true } } },
  });

  return (
    <div className="site-bg p-4 m-4 mt-0 flex-1">
      <ClassList classList={classList} />
    </div>
  );
};

export default ClassListPage;
