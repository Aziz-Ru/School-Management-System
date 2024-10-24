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
import { useRef, useState } from "react";
import { addSectionAction } from "../actions/section";

const AddSectionForm = ({
  classId,
  classTeacher,
}: {
  classId: number;
  classTeacher: { id: string; fullName: string }[];
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<string | undefined>(
    undefined
  );
  return (
    <FormModal table="Section">
      <form
        ref={formRef}
        action={async (formData: FormData) => {
          formData.append("id", classId.toString());
          formData.append("teacherId", selectedTeacher!);
          const { error, msg } = await addSectionAction(formData);
          if (error) {
            toast({ title: error, description: "Failed to added New Course" });
          }
          if (msg) {
            setSelectedTeacher(undefined);
            formRef.current!.reset();
            const today = new Date();
            toast({
              title: msg,
              description: `Class Teacher Added at ${today}`,
            });
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
        <div className="w-full mb-4">
          <Label>Class Teacher</Label>
          <div className="border rounded-md p-1">
            <Select
              value={selectedTeacher}
              onValueChange={setSelectedTeacher}
              name="teacherId"
              required={true}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Class Teacher" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {classTeacher.map((teacher) => (
                    <SelectItem
                      className="py-4"
                      key={teacher.id}
                      value={teacher.id}
                    >
                      {`${teacher.fullName}(${teacher.id})`}
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
