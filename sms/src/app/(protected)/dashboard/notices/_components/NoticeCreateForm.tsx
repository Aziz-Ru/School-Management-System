"use client";
import FormInput from "@/components/Forms/FormInput";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const NoticeCreateForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fileInput = formData.get("file") as File;
    if (!fileInput) {
      alert("Please upload a file.");
      return;
    }
    if (fileInput.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    try {
      const res = await fetch("/api/notices", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        toast({ title: "Failed to create Notice", variant: "destructive" });
      }
      if (data.msg) {
        formRef.current;
        router.push("/dashboard/notices");
        toast({ title: "Notice created successfully" });
      }
    } catch (error) {
      toast({ title: "Failed to create Notice", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">Create New Notice</h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <FormInput
          type="text"
          name="title"
          label="Title"
          required={true}
          width="w-full"
        />
        <FormInput
          type="file"
          name="file"
          label="File"
          required={true}
          width="w-full"
        />
        <select name="type" defaultValue="ACADEMIC" className="input">
          <option value="ACADEMIC">ACADEMIC</option>
          <option value="EXAMINATION">EXAMINATION</option>
          <option value="ADMINISTRATIVE">ADMINISTRATIVE</option>
          <option value="EVENT">EVENT</option>
        </select>
        <Button disabled={isLoading} type="submit">
          {isLoading ? "Creating" : "Create Notice"}
        </Button>
      </form>
    </div>
  );
};

export default NoticeCreateForm;
