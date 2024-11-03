import Annoucement from "@/components/NoticeCard";

import { Card } from "@/components/ui/card";
import prisma from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import SectionTab from "../_components/SectionTab";

interface StudentAttendanceData {
  Id: string;
  Name: string;
  [key: string]: boolean | string;
}

interface StudentGridColDefs {
  headerName: string;
  field: string;
  width: number;
  editable: boolean;
}

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
  const level = id < 6 ? "PRIMARY" : "SCHOOL";
  const date = new Date(searchParams.date).getDate()
    ? new Date(searchParams.date)
    : new Date();
  const day = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: day }, (_, i) => i + 1);

  const [sectionData, students, subjects, teacher] = await prisma.$transaction([
    prisma.section.findFirst({
      where: {
        id: params.sectionId,
      },
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
          where: {
            year: date.getFullYear(),
            date: {
              gte: new Date(date.getFullYear(), date.getMonth(), 1),
              lte: new Date(date.getFullYear(), date.getMonth() + 1, 0),
            },
          },
          select: {
            id: true,
            date: true,
            present: true,
            sectionId: true,
          },
        },
        sectionId: true,
      },
    }),
    prisma.subject.findMany({ where: { classId: parseInt(params.id) } }),
    prisma.teacher.findMany({
      where: {
        level: level,
      },
    }),
  ]);

  if (!sectionData) {
    notFound();
  }

  const getPresent = (attendence: any[], day: number): boolean => {
    const res = attendence.find((d) => d.date.getDate() === day);
    if (res) return true;
    return false;
  };

  const studentAttendence = students.map((stutdent) => {
    const studentData: StudentAttendanceData = {
      Id: stutdent.id.toString(),
      Name: stutdent.fullName,
    };
    days.forEach((day) => {
      studentData[`${day}`] = getPresent(stutdent.attendenceList, day);
    });
    return studentData;
  });

  const attendenceCol = days.map((day) => {
    return {
      headerName: `${day}`,
      field: `${day}`,
      width: 50,
      editable: day === date.getDate(),
    };
  });
  const AttendenceColDefs = [
    {
      headerName: "ID",
      field: "Id",
      width: 100,
      editable: false,
      resizable: false,
      pinned: "left",
    },
    {
      field: "Name",
      width: 150,
      editable: false,
    },
    ...attendenceCol,
  ];

  return (
    <div className="p-4 grid grid-cols-12 gap-2">
      {/* Name */}
      <div className="col-span-12 xl:col-span-8">
        <SectionTab
          classID={id}
          sectionId={params.sectionId}
          studentAttendenceList={studentAttendence}
          AttendenceColDefs={AttendenceColDefs}
          students={students}
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
