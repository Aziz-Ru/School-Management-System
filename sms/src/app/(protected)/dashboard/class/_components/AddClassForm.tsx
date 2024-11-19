"use client";
import FormModal from "@/components/Forms/FormModal";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { addClassAction } from "@/lib/actions/class";
import { useState } from "react";

const AddClassForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleAction = async () => {
    setIsLoading(true);
    const { error, msg } = await addClassAction();
    if (error) {
      toast({ title: error, description: "Failed to added New Class" });
    }
    if (msg) {
      const today = new Date();
      toast({ title: msg, description: `ALL Class Added at ${today}` });
    }
    setIsLoading(false);
  };
  return (
    <FormModal table="Class">
      <form action={handleAction}>
        <Button disabled={isLoading} type="submit" className="mt-4 w-full">
          {isLoading ? "Adding..." : "Add Class"}
        </Button>
      </form>
    </FormModal>
  );
};

export default AddClassForm;
