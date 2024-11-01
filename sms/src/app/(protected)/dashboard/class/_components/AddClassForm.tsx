"use client";
import FormModal from "@/components/Forms/FormModal";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { addClassAction } from "../_actions/class";

const AddClassForm = () => {
  return (
    <FormModal table="Class">
      <form
        action={async () => {
          const { error, msg } = await addClassAction();
          if (error) {
            toast({ title: error, description: "Failed to added New Class" });
          }
          if (msg) {
            const today = new Date();
            toast({ title: msg, description: `ALL Class Added at ${today}` });
          }
        }}
      >
        <Button type="submit" className="mt-4 w-full">
          Add Class 1 to 10
        </Button>
      </form>
    </FormModal>
  );
};

export default AddClassForm;
