"use client";
import { Classes } from "@/lib/types";

import { toast } from "@/hooks/use-toast";
import { add_exam_by_admin } from "@/lib/actions/exam";
import { useRef } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import FormInput from "./FormInput";
import FormModal from "./FormModal";

const AddExamForm = ({ classData }: { classData: Classes[] }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (formData: FormData) => {
    const { error, msg } = await add_exam_by_admin(formData);
    if (error) {
      toast({ title: error, variant: "destructive" });
    } else {
      toast({ title: msg });
    }
  };

  return (
    <FormModal table="Exam">
      <form ref={formRef} action={onSubmit}>
        <div className="flex gap-4 mb-4">
          <div className="w-1/2 flex flex-col gap-3 mb-4">
            <Label>Select Course</Label>
            <select name="class_id" className="input text-gray-800">
              {classData.map((classItem) => {
                return (
                  <option key={classItem.class_id} value={classItem.class_id}>
                    {classItem.class_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-1/2 flex flex-col gap-3 mb-4">
            <Label>Type</Label>
            <select name="exam_type" className="input text-gray-800">
              <option value="MIDTERM">MIDTERM</option>
              <option value="FINAL">FINAL</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4">
          <FormInput
            name="start_date"
            type="date"
            label="Start Date"
            required={true}
          />
          <FormInput
            name="end_date"
            type="date"
            label="End Date"
            required={true}
          />
        </div>
        <Button type="submit" className="w-full">
          Add
        </Button>
      </form>
    </FormModal>
  );
};

export default AddExamForm;
