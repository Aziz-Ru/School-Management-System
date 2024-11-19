"use client";

import FormInput from "@/components/Forms/FormInput";
import FormModal from "@/components/Forms/FormModal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { addSectionAction } from "@/lib/actions/section";
import { ClassSubject, Room, Teacher } from "@/lib/types";
import { useRef, useState } from "react";

const AddSectionForm = ({
  classId,
  classTeacher,
  class_subjects,
  rooms,
}: {
  classId: number;
  classTeacher: Teacher[];
  class_subjects: ClassSubject[];
  rooms: Room[];
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleAction = async (formData: FormData) => {
    setIsLoading(true);
    formData.append("class_id", classId.toString());
    const { error, msg } = await addSectionAction(formData);
    if (error) {
      toast({ title: error, description: "Failed to added New Section" });
    } else if (msg) {
      formRef.current!.reset();
      const today = new Date();
      toast({
        title: msg,
        description: `Class Teacher Added at ${today}`,
      });
    }
    setIsLoading(false);
  };

  return (
    <FormModal table="Section">
      <form action={handleAction} ref={formRef}>
        <div className="w-full flex items-center gap-4 ">
          <FormInput
            type="text"
            name="section_name"
            label="Section Name"
            required={true}
          />
          <div className="flex flex-col mb-4 gap-2 w-1/2">
            <Label>Room Id</Label>
            <select
              required
              name="room_id"
              className="outline-none px-4 py-2 rounded bg-transparent border border-gray-300"
            >
              <option className="text-gray-500" value="#" disabled>
                Choose Room Number
              </option>
              {rooms!.length > 0 &&
                rooms.map((room) => (
                  <option
                    className="text-gray-800"
                    key={room.id}
                    value={room.roomNumber}
                  >
                    {room.roomNumber}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-3 mb-4">
          <Label>Class Teacher</Label>
          <select
            required
            name="teacher_id"
            className="outline-none px-4 py-2 rounded bg-transparent border border-gray-300"
          >
            <option disabled>Choose Class Teacher</option>
            {classTeacher.length > 0 &&
              classTeacher.map((teacher) => (
                <option key={teacher.teacher_id} value={teacher.teacher_id}>
                  {teacher.first_name} {teacher.last_name}
                </option>
              ))}
          </select>
        </div>

        {class_subjects.map((subject, index) => {
          return (
            <div key={index} className="w-full flex items-center gap-4 mb-4">
              <div className="flex flex-col gap-3 w-1/2">
                <Label>Subject Name</Label>
                <input
                  type="text"
                  className="input text-gray-800 disabled:opacity-75"
                  value={subject.subject?.subject_name}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-3  w-1/2">
                <Label>Enrolled Teacher</Label>
                <select
                  required
                  name={`enrolled_teacher_${subject.subject_name}`}
                  className="outline-none px-4 py-2 rounded bg-transparent border border-gray-300"
                >
                  <option
                    disabled
                  >{`Choose ${subject.subject?.subject_name} Teacher`}</option>
                  {subject.subject!.teacher!.map((teacher, index) => (
                    <option
                      key={`${teacher.teacher_id}_${index}`}
                      value={teacher.teacher_id}
                    >
                      {teacher.first_name} {teacher.last_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? "Loading..." : "Add Section"}
        </Button>
      </form>
    </FormModal>
  );
};

export default AddSectionForm;
