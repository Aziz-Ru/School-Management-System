import Annoucement from "@/components/Annoucement";
import DayCard from "@/components/features/section/components/DayCard";
import AddStudentForm from "@/components/features/students/components/StudentForm";
import TableSearch from "@/components/TableSearch";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";

const SingleSection = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string };
}) => {
  const sectionData = await prisma.section.findFirst({
    where: { id: params.id },
    select: {
      sectionName: true,
      sectionTeacher: {
        select: { fullName: true },
      },
    },
  });

  if (!sectionData) {
    notFound();
  }

  return (
    <div className="p-4 grid grid-cols-12 gap-2">
      {/* Name */}
      <div className="col-span-12 xl:col-span-8">
        <Card className="p-3 mb-4">
          <h1 className="font-bold text-xl mb-4">Class Routine</h1>
          <DayCard />
          <DayCard />
          <DayCard />
          <DayCard />
          <DayCard />
          <DayCard />
        </Card>
        <Card className="p-3">
          <h1 className="font-bold text-xl mb-2">Students</h1>
          <div>
            <div className="flex justify-between">
              <TableSearch />
              <AddStudentForm />
            </div>
            <div></div>
          </div>
        </Card>
      </div>
      {/* Annoucement */}
      <div className="col-span-12 xl:col-span-4">
        <Card className="p-1">
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
              <h1 className="font-bold">
                {sectionData.sectionTeacher!.fullName}
              </h1>
            </div>
          </Card>
          <Annoucement />
        </Card>
      </div>
    </div>
  );
};

export default SingleSection;

// {

// Sample data for class routine
// const routineData = [
//   {
//     day: "Monday",
//     classes: [
//       {
//         subject: "Math",
//         startTime: "9:00 AM",
//         endTime: "10:00 AM",
//         teacher: "Mr. A",
//       },
//       {
//         subject: "Physics",
//         startTime: "10:00 AM",
//         endTime: "11:00 AM",
//         teacher: "Ms. B",
//       },
//     ],
//   },
//   {
//     day: "Tuesday",
//     classes: [
//       {
//         subject: "English",
//         startTime: "9:00 AM",
//         endTime: "10:00 AM",
//         teacher: "Mr. C",
//       },
//       {
//         subject: "Biology",
//         startTime: "10:00 AM",
//         endTime: "11:00 AM",
//         teacher: "Ms. D",
//       },
//     ],
//   },
//   // Add more days and classes here
// ];
