import { getSectionRoutine } from "@/utils/get_sectionData";
import { Status } from "@/utils/types";
import { notFound } from "next/navigation";
import Routine from "./_components/Routine";

const SectionRoutine = async ({
  params,
}: {
  params: { sectionId: string };
}) => {
  const { subjects, schedules, teachers, status } = await getSectionRoutine(
    params.sectionId
  );

  if (status === Status.NOT_FOUND) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Routine</h1>
        <div className="flex gap-4 flex-wrap ">
          <Routine schedules={schedules!} />
        </div>
      </div>
    </div>
  );
};

export default SectionRoutine;
