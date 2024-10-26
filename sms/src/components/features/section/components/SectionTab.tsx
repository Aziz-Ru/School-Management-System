"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchAttendence from "./SearchAttendence";

const SectionTab = () => {
  return (
    <div>
      <Tabs defaultValue="attendance">
        <TabsList className="w-full justify-center items-center gap-4 p-8">
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="class-routine">Class Routine</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>
        <TabsContent value="attendance">
          <SearchAttendence />
        </TabsContent>
        <TabsContent value="class-routine">ClassRoutine</TabsContent>
        <TabsContent value="students">Students</TabsContent>
      </Tabs>
    </div>
  );
};

export default SectionTab;
