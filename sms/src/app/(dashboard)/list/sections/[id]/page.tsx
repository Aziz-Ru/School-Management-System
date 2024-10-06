import BigCalendar from "@/components/BigCalendar";
import { role } from "@/lib/data";
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
  });

  if (!sectionData) {
    notFound();
  }

  return (
    <div>
      <div className="p-4">
        <div className="flex gap-4 items-center">
          <h2 className="text-xl font-bold">Super Visor:{}</h2>
          {role === "admin" && <button>Edit</button>}
        </div>
        <div className=""></div>
      </div>
      <div className="routine-container">
        <BigCalendar />
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
