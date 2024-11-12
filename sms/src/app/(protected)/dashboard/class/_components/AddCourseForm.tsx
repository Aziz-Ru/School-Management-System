"use client";
import FormModal from "@/components/Forms/FormModal";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { AddSubjectToClassAction } from "@/lib/actions/class";
import { useRef, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const AddCourseForm = ({
  options,
  classId,
}: {
  classId: number;
  options: { label: string; value: string }[];
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedCourses, setSelectedCourses] = useState<
    { label: string; value: string }[]
  >([]);

  return (
    <FormModal table="Subject">
      <form
        ref={formRef}
        action={async (formData: FormData) => {
          if (selectedCourses.length == 0) {
            toast({
              title: "Select Course",
              description: "Please Select a Course For Class",
            });
            return;
          }
          formData.append(
            "subjects",
            selectedCourses.map((course) => course.value).join(",")
          );
          formData.append("class_id", classId.toString());
          const { error, msg } = await AddSubjectToClassAction(formData);

          if (error) {
            toast({ title: error, description: "Failed to added New Course" });
          }
          if (msg) {
            formRef.current!.reset();
            setSelectedCourses([]);
            const today = new Date();
            toast({ title: msg, description: `Course Added at ${today}` });
          }
        }}
      >
        <div className="mb-4">
          <MultiSelect
            value={selectedCourses}
            onChange={setSelectedCourses}
            options={options}
            labelledBy="Select"
          />
        </div>
        <Button type="submit" className="w-full">
          Add Course
        </Button>
      </form>
    </FormModal>
  );
};

export default AddCourseForm;
