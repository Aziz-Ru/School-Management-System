import DayCard from "@/components/features/section/components/DayCard";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/db";
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
      <div className="col-span-12 xl:col-span-8 border rounded">
        <div className="p-3">
          <h1 className="font-bold text-xl">Class Routine</h1>
          <DayCard />
          <DayCard />
          <DayCard />
          <DayCard />
          <DayCard />
          <DayCard />
        </div>
      </div>
      {/* Annoucement */}
      <div className="col-span-12 xl:col-span-4">
        <Card>h1</Card>
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
