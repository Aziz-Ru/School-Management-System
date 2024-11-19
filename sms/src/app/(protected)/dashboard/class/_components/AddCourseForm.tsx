"use client";
import FormModal from "@/components/Forms/FormModal";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { add_subject_to_class_action } from "@/lib/actions/class";
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
  const [isLoading, setIsLoading] = useState(false);
  const handleAction = async (formData: FormData) => {
    setIsLoading(true);
    if (selectedCourses.length == 0) {
      toast({
        title: "Select Course",
        description: "Please Select a Course For Class",
        variant: "destructive",
      });
      return;
    }
    formData.append(
      "subjects",
      selectedCourses.map((course) => course.value).join(",")
    );
    formData.append("class_id", classId.toString());
    const { error, msg } = await add_subject_to_class_action(formData);

    if (error) {
      toast({
        title: error,
        description: "Failed to added New Course",
        variant: "destructive",
      });
    }
    if (msg) {
      formRef.current!.reset();
      setSelectedCourses([]);
      const today = new Date();
      toast({ title: msg, description: `Course Added at ${today}` });
    }
    setIsLoading(false);
  };

  return (
    <FormModal table="Subject">
      <form ref={formRef} action={handleAction}>
        <div className="mb-4">
          <MultiSelect
            value={selectedCourses}
            onChange={setSelectedCourses}
            options={options}
            labelledBy="Select"
          />
        </div>
        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? "Adding..." : "Add Course"}
        </Button>
      </form>
    </FormModal>
  );
};

export default AddCourseForm;
