import { create_timeslot_action } from "@/lib/actions/timeslot";
import { get_section_schedule } from "@/lib/controller/get_sections";
import { Status } from "@/lib/types";
import { notFound } from "next/navigation";
import AddRoutine from "./_components/AddRoutine";
import SchedulTable from "./_components/SchedulTable";

const SectionRoutine = async ({
  params,
}: {
  params: { sectionId: string };
}) => {
  const { status, section_schedule, time_slots, section_subject } =
    await get_section_schedule(params.sectionId);
  if (status != Status.OK) {
    notFound();
  }
  if (time_slots?.length === 0) {
    await create_timeslot_action();
  }
  

  return (
    <div className="mx-auto">
      <div className="p-4">
        <div className="flex flex-col xl:flex-row ">
          <div className="mb-4 w-full xl:w-2/3">
            <h1 className="text-2xl font-bold">Routine</h1>
            <SchedulTable schedules={section_schedule!} />
          </div>
          <div className="w-full xl:px-4 xl:w-1/3 ">
            <AddRoutine
              subjects={section_subject!}
              section_id={params.sectionId}
              time_slots={time_slots!}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionRoutine;
