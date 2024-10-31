import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/db";
import TeacherAttendenceList from "./_components/AttendencList";

const AttendanceList = async () => {
  const current = new Date();
  const [teachers] = await prisma.$transaction([
    prisma.teacher.findMany({
      select: {
        id: true,
        fullName: true,
        attendence: {
          where: {
            year: current.getFullYear(),
            month: current.getMonth() + 1,
          },
          select: {
            id: true,
            present: true,
            date: true,
            year: true,
          },
        },
      },
    }),
  ]);
  // console.log(teachers[0].attendence);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Attendence</h1>
      <div className=" flex flex-col gap-10">
        <div className="">
          <TableSearch />
        </div>
        <div className="">
          <TeacherAttendenceList teachers={teachers} />
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;
