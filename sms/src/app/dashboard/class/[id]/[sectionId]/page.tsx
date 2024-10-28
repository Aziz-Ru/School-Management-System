import Annoucement from "@/components/Annoucement";

import { Card } from "@/components/ui/card";
import prisma from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import SectionTab from "../_components/SectionTab";

const SectionPage = async ({
  params,
  searchParams,
}: {
  params: { sectionId: string };
  searchParams: { [key: string]: string };
}) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = searchParams.month
    ? parseInt(searchParams.month)
    : new Date().getMonth() + 1;
  
  const [sectionData, students] = await prisma.$transaction([
    prisma.section.findUnique({
      where: { id: params.sectionId },
      select: {
        sectionTeacher: {
          select: {
            fullName: true,
          },
        },
      },
    }),
    prisma.student.findMany({
      where: { sectionId: params.sectionId },
      select: {
        id: true,
        fullName: true,
        attendenceList: {
          select: {
            id: true,
            date: true,
            present: true,
            sectionId: true,
          },
        },
      },
    }),
  ]);

  if (!sectionData) {
    notFound();
  }

  return (
    <div className="p-4 grid grid-cols-12 gap-2">
      {/* Name */}
      <div className="col-span-12 xl:col-span-8">
        <SectionTab
          students={students}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />
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

export default SectionPage;

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
