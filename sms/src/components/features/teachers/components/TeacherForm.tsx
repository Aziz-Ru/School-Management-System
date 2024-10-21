"use client";
import FormInput from "@/components/Forms/FormInput";
import FormModal from "@/components/Forms/FormModal";
import FormSelect from "@/components/Forms/FormSelect";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { addTeacherAction } from "../actions/teacher";
export default function AddTeacherForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [selected, setSelected] = useState([]);
  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry" },
  ];


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
        <FormInput
          type="text"
          name="fullName"
          label="Full Name"
          required={true}
          width="w-full"
        />

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
        <MultiSelect
          value={selected}
          onChange={setSelected}
          options={options}
          labelledBy="Select"
        />

        <div className="flex gap-4">
          <div className="w-1/2">
            {/* Level */}
            <FormSelect
              name="level"
              label="Level"
              options={["PRIMARY", "SCHOOL", "COLLEGE"]}
            />
          </div>

          {/* Rank */}
          <div className="w-1/2">
            <FormSelect
              name="rank"
              label="Rank"
              options={["SENIOR", "ASSISTANT"]}
            />
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
            <FormSelect
              options={["MALE", "FEMALE"]}
              name="sex"
              label="Gender"
            />
          </div>
        </div>

        <Button type="submit" className="mt-4 w-full">
          Add
        </Button>
      </form>
    </FormModal>
  );
  
}
