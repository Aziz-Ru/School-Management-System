import prisma from "@/lib/db";
import EachSection from "./eachSection";

const GetSection = async () => {
  const sections = await prisma.section.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="site-txt">
      <EachSection initialSections={sections} />
    </div>
  );
};

export default GetSection;
