import Addsection from "@/components/section/addSection";
import GetSection from "@/components/section/getSection";
import prisma from "@/lib/db";

const Section = async () => {
  const classrooms = await prisma.classRoom.findMany({
    orderBy: { classId: "asc" },
    select: { className: true, id: true },
  });

  return (
    <section className="site-bg max-h-screen">
      <div className="max-w-screen-xl mx-auto">
        <Addsection Classes={classrooms} />
        <GetSection />
      </div>
    </section>
  );
};

export default Section;
