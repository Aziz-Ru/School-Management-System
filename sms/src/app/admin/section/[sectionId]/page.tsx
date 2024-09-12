import Breadcrumb from "@/components/Breadcrumb";
import Routine from "@/components/routine/Routine";
import prisma from "@/lib/db";

const page = async ({ params }: { params: { sectionId: string } }) => {
  const sectionId = params.sectionId;
  const section = await prisma.section.findUnique({
    where: { id: sectionId },
    include: { classRoom: true },
  });

  return (
    <div className="site-bg">
      <div className="max-w-screen-xl mx-auto px-6">
        <Breadcrumb
          sectionName={section?.sectionName || "SectionName"}
          year={section?.year || "Year"}
          className={section?.classRoom?.className || "ClassName"}
        />
        <div className=" mb-4">
          <h2 className="text-center site-txt text-2xl font-medium">
            Class Routine
          </h2>
        </div>
        <Routine />
      </div>
    </div>
  );
};

export default page;
