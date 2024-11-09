import FormModal from "@/components/Forms/FormModal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DaysOfWeek, Times } from "@/lib/data";
import { Schedule, Subject, Teacher } from "@/utils/types";
import { useEffect, useState } from "react";

const RoutineEditForm = ({
  activeSchedule,
  teachers,
  subjects,
  sectionId,
}: {
  activeSchedule: Schedule;
  teachers: Teacher[];
  subjects: Subject[];
  sectionId: string;
}) => {
  const [selectedSubjectName, setSelectSubjectName] = useState<string>(
    activeSchedule.subject?.courseName!
  );
  const [selectedTeacher, setSelectTeacher] = useState<string>(
    activeSchedule.teacher?.fullName!
  );
  const [selectedDay, setSelectDay] = useState<string>(activeSchedule.day!);
  const [selectedHour, setSelectHour] = useState<string>(
    activeSchedule.startEnd!
  );
  const [subjectTeacher, setSubjectTeacher] = useState<
    { id: number; fullName: string }[]
  >([]);

  useEffect(() => {
    setSubjectTeacher(
      teachers.filter((teacher) =>
        teacher.courses?.some(
          (course) =>
            course.courseName ===
            subjects.find((s) => s.id === selectedSubjectName)?.courseName
        )
      )
    );
  }, [selectedSubjectName, subjects, teachers]);

  return (
    <FormModal type="Edit" table={activeSchedule.subject?.courseName!}>
      <form
        action={async (formData: FormData) => {
          //   formData.append("sectionId", sectionId);
          //   formData.append("day", selectedDay);
          //   formData.append("hour", selectedHour);
          //   formData.append("subjectId", selectedSubjectName);
          //   formData.append("teacherId", selectedTeacher);
          //   const { msg, error } = await createRoutine(formData);
          //   if (error) {
          //     toast({ title: error });
          //   }
          //   if (msg) {
          // setSelectSubjectName("");
          // setSelectTeacher("");
          // setSelectDay("");
          // setSelectHour("");
          // toast({ title: msg });
          //   }
        }}
        className="flex flex-col w-full gap-3 px-3"
      >
        <div className="flex gap-3">
          <div className="flex flex-col gap-3 mb-4 w-1/2">
            <Label>Subject</Label>
            <Select
              value={selectedSubjectName}
              onValueChange={(e) => {
                console.log(e);
                setSelectSubjectName(e);
              }}
              name={"subjectId"}
              required={true}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select Subject `} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Subject</SelectLabel>
                  {subjects.map((subject, index) => {
                    return (
                      <SelectItem key={index} value={subject.id}>
                        {subject.courseName}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3 mb-4 w-1/2">
            <Label>Teacher</Label>
            <Select
              value={selectedTeacher}
              onValueChange={(e) => {
                setSelectTeacher(e);
              }}
              name={"teacherId"}
              required={true}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select Teacher `} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Subject</SelectLabel>
                  {subjectTeacher.map((teacher, index) => {
                    return (
                      <SelectItem key={index} value={teacher.id.toString()}>
                        {teacher.fullName}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col gap-3 mb-4 w-1/2">
            <Label>Day</Label>
            <Select
              value={selectedDay}
              onValueChange={(e) => {
                setSelectDay(e);
              }}
              name={"subjectId"}
              required={true}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select Day`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Subject</SelectLabel>
                  {DaysOfWeek.map((day, index) => {
                    return (
                      <SelectItem key={index} value={day.toUpperCase()}>
                        {day}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3 mb-4 w-1/2">
            <Label>Hour</Label>
            <Select
              value={selectedHour}
              onValueChange={(e) => {
                setSelectHour(e);
              }}
              name={"hour"}
              required={true}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select Hour `} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Subject</SelectLabel>
                  {Times.map((time, index) => {
                    return (
                      <SelectItem key={index} value={time.time}>
                        {time.time}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </FormModal>
  );
};

export default RoutineEditForm;
