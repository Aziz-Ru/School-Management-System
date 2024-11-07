"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Schedule, Subject, Teacher } from "@/utils/types";
import { Student } from "../../../../../utils/types";
import AttendenceList from "./AttendencList";
import Routine from "./Routine";
import SearchAttendence from "./SearchAttendence";
import StudentList from "./StudentList";
const SectionTab = ({
  classID,
  sectionId,
  students,
  schedules,
  teachers,
  subjects,
}: {
  sectionId: string;
  classID: number;
  students: Student[];
  schedules: Schedule[];
  teachers: Teacher[];
  subjects: Subject[];
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
          <AttendenceList sectionId={sectionId} students={students} />
        </TabsContent>
        <TabsContent value="class-routine">
          <Routine
            teachers={teachers}
            schedules={schedules}
            classID={classID}
            sectionId={sectionId}
            subjects={subjects}
          />
        </TabsContent>
        <TabsContent value="students">
          <StudentList students={students} classId={classID} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SectionTab;
