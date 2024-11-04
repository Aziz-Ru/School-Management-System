import { Card } from "@/components/ui/card";
import { getSectionData } from "@/utils/get_sectionData";
import Image from "next/image";
import { notFound } from "next/navigation";
import SectionTab from "../_components/SectionTab";

const SectionPage = async ({
  params,
  searchParams,
}: {
  params: { sectionId: string; id: string };
  searchParams: { [key: string]: string };
}) => {
  const id = parseInt(params.id);
  if (isNaN(id) || id < 1 || id > 10) {
    notFound();
  }

  const date = new Date(searchParams.date).getDate()
    ? new Date(searchParams.date)
    : new Date();

  const { section, students, subjects, teachers } = await getSectionData(
    id,
    params.sectionId,
    date
  );
  if (!section) {
    notFound();
  }

  return (
    <div className="p-4 grid grid-cols-12 gap-2">
      {/* Name */}

      <div className="col-span-12 xl:col-span-8">
        <SectionTab
          classID={id}
          sectionId={params.sectionId}
          students={students!}
        />
      </div>

      {/* Annoucement */}
      <div className="col-span-12 xl:col-span-4">
        <div className="p-1">
          <Card className="p-4">
            <h1 className="text-xl font-bold mb-1">Section Teacher</h1>
            <hr className="border-gray-500 mb-2" />
            <div className="flex gap-4">
              <Image
                src={"/image/noavatar.png"}
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <h1 className="font-bold">{section!.sectionTeacher!.fullName}</h1>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SectionPage;
