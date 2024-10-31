"use client";

import FormInput from "@/components/Forms/FormInput";
import FormModal from "@/components/Forms/FormModal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import { addSectionAction } from "../_actions/section";

const AddSectionForm = ({
  classId,
  classTeacher,
}: {
  classId: number;
  classTeacher: { id: string; fullName: string }[];
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  return (
    <FormModal table="Section">
      <form
        action={async (formData: FormData) => {
          formData.append("id", classId.toString());
          const { error, msg } = await addSectionAction(formData);
          if (error) {
            toast({ title: error, description: "Failed to added New Section" });
          }
          if (msg) {
            formRef.current!.reset();
            setSelectedTeacher("");
            const today = new Date();
            toast({
              title: msg,
              description: `Class Teacher Added at ${today}`,
            });
          }
        }}
        ref={formRef}
      >
        <FormInput
          type="text"
          name="sectionName"
          label="Section Name"
          required={true}
          width="w-full"
        />
        <div className="flex flex-col gap-3 mb-4">
          <Label>Level</Label>
          <select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            required
            name="teacherId"
            className="outline-none px-4 py-2 rounded bg-transparent border border-gray-300"
          >
            <option value="" disabled selected>
              Please Choose...
            </option>
            {classTeacher.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.fullName}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" className="w-full">
          Add Section
        </Button>
      </form>
    </FormModal>
  );
};

export default AddSectionForm;
