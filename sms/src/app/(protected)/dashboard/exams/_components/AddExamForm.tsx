"use client";
import { Classes } from "@/lib/types";

import FormInput from "@/components/Forms/FormInput";
import FormModal from "@/components/Forms/FormModal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { add_exam_by_admin } from "@/lib/actions/exam";
import { useRef, useState } from "react";

const AddExamForm = ({ classData }: { classData: Classes[] }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoaing, setIsLoading] = useState(false);

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const { error, msg } = await add_exam_by_admin(formData);
    try {
      if (error) {
        toast({ title: error, variant: "destructive" });
      } else {
        toast({ title: msg });
      }
    } catch (error) {
      toast({ title: "Failed to create an exam", variant: "destructive" });
    } finally {
      setIsLoading(false);
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
        <Button disabled={isLoaing} type="submit" className="w-full">
          {isLoaing ? "Loading..." : "Create Exam"}
        </Button>
      </form>
    </FormModal>
  );
};

export default AddExamForm;
