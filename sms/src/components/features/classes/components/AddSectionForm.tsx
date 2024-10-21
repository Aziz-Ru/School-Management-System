"use client";
import FormInput from "@/components/Forms/FormInput";
import FormModal from "@/components/Forms/FormModal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "@/hooks/use-toast";
import { SelectTrigger } from "@radix-ui/react-select";
import { useRef } from "react";
import { addCourseAction } from "../actions/course";

const AddSectionForm = ({
  classId,
  classTeacher,
}: {
  classId: number;
  classTeacher: { id: string; fullName: string }[];
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <FormModal table="Section">
      <form
        ref={formRef}
        action={async (formData: FormData) => {
          formData.append("id", classId.toString());
          const { error, msg } = await addCourseAction(formData);
          if (error) {
            toast({ title: error, description: "Failed to added New Course" });
          }
          if (msg) {
            formRef.current!.reset();
            const today = new Date();
            toast({ title: msg, description: `A Course Added at ${today}` });
          }
        }}
      >
        <FormInput
          type="text"
          name="sectionName"
          label="Section Name"
          required={true}
          width="w-full"
        />
        <div className="w-full mb-2">
          <Label>Class Teacher</Label>
          <div className="border rounded-md p-1">
            <Select name="teacherId">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Class Teacher For This Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {classTeacher.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.id} {teacher.fullName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Add Section
        </Button>
      </form>
    </FormModal>
  );
};

export default AddSectionForm;
