import { getSectionRoutine } from "@/utils/get_sectionData";
import { Status } from "@/utils/types";
import { notFound } from "next/navigation";
import AddRoutine from "./_components/AddRoutine";
import Routine from "./_components/Routine";

const SectionRoutine = async ({
  params,
}: {
  params: { sectionId: string };
}) => {
  const { subjects, schedules, teachers, status } = await getSectionRoutine(
    params.sectionId
  );

  if (status != Status.OK) {
    notFound();
  }

  return (
    <div className="mx-auto">
      <div className="p-4">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-7">
            <h1 className="text-2xl font-semibold mb-4">Routine</h1>
            <div className="flex gap-4 flex-wrap">
              <Routine
                teachers={teachers!}
                subjects={subjects!}
                schedules={schedules!}
                sectionId={params.sectionId}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 px-4">
            <AddRoutine
              teachers={teachers!}
              subjects={subjects!}
              sectionId={params.sectionId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionRoutine;
