"use client";
import FormModal from "@/components/Forms/FormModal";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { selectCourseAction } from "../actions/course";

const SelectCourseForm = ({
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
    <FormModal table="Course">
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
            "course",
            selectedCourses.map((course) => course.value).join(",")
          );
          formData.append("classId", classId.toString());
          const { error, msg } = await selectCourseAction(formData);
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

export default SelectCourseForm;
