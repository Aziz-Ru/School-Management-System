"use client";

import FormInput from "@/components/Forms/FormInput";
import FormModal from "@/components/Forms/FormModal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { addTeacherAction } from "@/lib/actions/teacher";
import { Subject } from "@/lib/types";
import { useRef } from "react";

export default function AddTeacherForm({ subjects }: { subjects: Subject[] }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <FormModal table={"Teacher"}>
      <form
        ref={formRef}
        action={async (formData: FormData) => {
          const { error, msg } = await addTeacherAction(formData);
          if (error) {
            toast({ title: error, description: "Failed to added New Teacher" });
          } else if (msg) {
            const today = new Date();
            toast({ title: msg, description: `A Teacher Added at ${today}` });
            formRef.current!.reset();
          }
        }}
      >
        {/* Full Name */}
        <div className="w-full flex gap-4">
          <FormInput
            type="text"
            name="first_name"
            label="First Name"
            required={true}
          />
          <FormInput
            type="text"
            name="last_name"
            label="Last Name"
            required={true}
          />
        </div>

        <div className="w-full flex gap-4">
          {/* Email */}
          <FormInput type="email" name="email" label="Email" required={true} />
          {/* Phone */}
          <FormInput type="tel" name="phone" label="Phone" required={true} />
        </div>
        <div className="flex gap-4">
          {/* ID */}
          <FormInput type="number" name="id" label="ID" required={true} />

          {/* Password */}
          <FormInput
            type="password"
            name="password"
            label="Password"
            required={true}
          />
        </div>
        <div className="flex w-full gap-4">
          <div className="w-1/2 flex flex-col gap-3 mb-4">
            <Label>Select Course</Label>
            <select name="subject_id" className="input ">
              {subjects.map((subject) => {
                return (
                  <option key={subject.subject_id} value={subject.subject_id}>
                    {subject.subject_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-1/2 flex flex-col gap-3 mb-4">
            <Label>Select Degree</Label>
            <select name="degree" className="input">
              <option value={"MSC"}>MSc</option>
              <option value={"BSC"}>BSc</option>
              <option value={"BBA"}>BBa</option>
            </select>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="w-1/2">
            {/* Level */}
            <div className="flex flex-col gap-3 mb-4">
              <Label>Level</Label>
              <select name="level" className="input">
                <option value={"PRIMARY"}>Primary</option>
                <option value={"SECONDARY"}>Secondary</option>
              </select>
            </div>
          </div>

          {/* Rank */}
          <div className="w-1/2">
            <div className="flex flex-col gap-3 mb-4">
              <Label>Rank</Label>
              <select name="rank" className="input">
                <option value={"ASSISTANT"}>Assistant</option>
                <option value={"SENIOR"}>Senior</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          {/* Sex */}
          <FormInput
            type="text"
            name="address"
            label="Address"
            required={true}
          />
          <div className="w-1/2">
            {/* Address */}
            <div className="flex flex-col gap-3 mb-4">
              <Label>GENDER</Label>
              <select name="gender" className="input">
                <option value={"MALE"}>Male</option>
                <option value={"FEMALE"}>Female</option>
              </select>
            </div>
          </div>
        </div>

        <Button type="submit" className="mt-4 w-full">
          Add
        </Button>
      </form>
    </FormModal>
  );
}
