"use client";
import FormInput from "@/components/Forms/FormInput";
import FormModal from "@/components/Forms/FormModal";
import FormSelect from "@/components/Forms/FormSelect";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useRef } from "react";
import { addCourseAction } from "../_actions/course";

const AddCourseForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <FormModal table="Course">
      <form
        ref={formRef}
        action={async (formData: FormData) => {
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
        <div className="w-full">
          <FormInput
            type="text"
            name="courseName"
            label="Course Name"
            required={true}
            width="w-full"
          />
          <FormSelect name="mark" options={["100", "50"]} label="Mark" />
        </div>
        <Button type="submit" className="w-full">
          Add Course
        </Button>
      </form>
    </FormModal>
  );
};

export default AddCourseForm;
