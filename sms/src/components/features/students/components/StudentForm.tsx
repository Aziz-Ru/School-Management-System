"use client";
import FormInput from "@/components/Forms/FormInput";
import FormModal from "@/components/Forms/FormModal";
import FormSelect from "@/components/Forms/FormSelect";
import { Button } from "@/components/ui/button";

export default function AddStudentForm() {
  return (
    <FormModal table={"Student"}>
      <form
        action={(formData: FormData) => {
          console.log(formData);
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
          <FormInput type="text" name="id" label="ID" required={true} />

          {/* Password */}
          <FormInput
            type="password"
            name="password"
            label="Password"
            required={true}
          />
        </div>

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
              options={["Senior", "Asistant"]}
            />
          </div>
        </div>

        {/* Address */}
        <FormInput
          type="text"
          name="address"
          width="w-full"
          label="Address"
          required={true}
        />

        <Button type="submit" className="mt-4 w-full">
          Add
        </Button>
      </form>
    </FormModal>
  );
}
