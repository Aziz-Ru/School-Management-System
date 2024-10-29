"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AttendenceList from "./AttendencList";
import Routine from "./Routine";
import SearchAttendence from "./SearchAttendence";

interface StudentAttendanceData {
  Id: string;
  Name: string;
  [key: string]: boolean | string;
}

const SectionTab = ({
  sectionId,
  studentAttendenceList,
  AttendenceColDefs,
}: {
  sectionId: string;
  studentAttendenceList: StudentAttendanceData[];
  AttendenceColDefs: any[];
}) => {
  return (
    <div>
      <Tabs defaultValue="attendance">
        <TabsList className="w-full justify-center items-center gap-4 p-8">
          <TabsTrigger value="attendance" className="px-3 py-2">
            Attendance
          </TabsTrigger>
          <TabsTrigger value="class-routine" className="px-3 py-2">
            Class Routine
          </TabsTrigger>
          <TabsTrigger value="students" className="px-3 py-2">
            Students
          </TabsTrigger>
        </TabsList>
        <TabsContent value="attendance">
          <SearchAttendence />
          <AttendenceList
            sectionId={sectionId}
            studentAttendenceList={studentAttendenceList}
            AttendenceColDefs={AttendenceColDefs}
          />
        </TabsContent>
        <TabsContent value="class-routine">
          <Routine sectionId={sectionId} />
        </TabsContent>
        <TabsContent value="students">Students</TabsContent>
      </Tabs>
    </div>
  );
};

export default SectionTab;
