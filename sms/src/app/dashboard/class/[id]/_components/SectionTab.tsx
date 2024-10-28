"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AttendenceList from "./AttendencList";
import SearchAttendence from "./SearchAttendence";

const SectionTab = ({
  students,
  currentMonth,
  currentYear,
}: {
  students: any;
  currentMonth: number;
  currentYear: number;
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
            students={students}
            currentYear={currentYear}
            currentMonth={currentMonth}
          />
        </TabsContent>
        <TabsContent value="class-routine">ClassRoutine</TabsContent>
        <TabsContent value="students">Students</TabsContent>
      </Tabs>
    </div>
  );
};

export default SectionTab;
