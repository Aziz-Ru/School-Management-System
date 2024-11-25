"use client";
import FormInput from "@/components/Forms/FormInput";
import FormModal from "@/components/Forms/FormModal";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { editSubjectAction } from "@/lib/actions/subjects";
import { Subject } from "@/lib/types";
import { useRef, useState } from "react";

const EditSubjectForm = ({ data }: { data: Subject }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (formData: FormData) => {
    setIsLoading(true);
    try {
      formData.append("name", data.subject_name);
      const { error, msg } = await editSubjectAction(formData);
      if (error) {
        toast({
          title: error,
          description: "Failed Subject Update",
          variant: "destructive",
        });
      }
      if (msg) {
        formRef.current!.reset();
        toast({ title: msg, description: `Subject Updated Successfully` });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Failed to added New Course",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormModal table="Subject" type="Edit">
      <form ref={formRef} action={handleAction}>
        <div className="w-full">
          <FormInput
            type="text"
            name="name"
            label="Subject Name"
            disabled={true}
            value={data.subject_name}
            required={true}
            width="w-full"
          />
          <FormInput
            type="number"
            name="code"
            value={data.subject_code.toString()}
            label="Subject Code"
            required={true}
            width="w-full"
          />
        </div>
        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? "Editing..." : "Submit"}
        </Button>
      </form>
    </FormModal>
  );
};

export default EditSubjectForm;
