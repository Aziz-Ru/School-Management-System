"use client";
import FormInput from "@/components/Forms/FormInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { createNotice } from "../_actions/create_notice_action";

const NoticeCreateForm = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">Create New Notice</h1>
      <form
        action={async (formData: FormData) => {
          const { msg, error } = await createNotice(formData);
          if (msg) {
            toast({ title: msg });
          } else {
            toast({ title: error });
          }
        }}
        className="flex flex-col gap-4"
      >
        <FormInput
          type="text"
          name="title"
          label="Title"
          required={true}
          width="w-full"
        />
        <div className="">
          <Label className="mb-4"> Content</Label>
          <Textarea name="content" rows={20} placeholder="Type Your Content" />
        </div>
        <Button type="submit">Create Notice</Button>
      </form>
    </div>
  );
};

export default NoticeCreateForm;
