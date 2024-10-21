"use client";
import FormInput from "@/components/Forms/FormInput";
import FormModal from "@/components/Forms/FormModal";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useRef } from "react";
import { addCourseAction } from "../actions/course";

const AddCourseForm = ({ classId }: { classId: number }) => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <FormModal table="Course">
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
          name="courseName"
          label="Course Name"
          required={true}
          width="w-full"
        />
        <Button type="submit" className="w-full">
          Add Course
        </Button>
      </form>
    </FormModal>
  );
};

export default AddCourseForm;
