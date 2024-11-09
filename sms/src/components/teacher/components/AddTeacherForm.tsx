"use client";

import FormInput from "@/components/Forms/FormInput";
import FormModal from "@/components/Forms/FormModal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { addTeacherAction } from "../actions/teacher";

export default function AddTeacherForm({
  courseOption,
}: {
  courseOption: { label: string; value: string }[];
}) {
  const [level, setLevel] = useState("");
  const [rank, setRank] = useState("");
  const [gender, setGender] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [selected, setSelected] = useState<{ label: string; value: string }[]>(
    []
  );

  return (
    <FormModal table={"Teacher"}>
      <form
        ref={formRef}
        action={async (formData: FormData) => {
          if (selected.length == 0) {
            toast({
              title: "Select a Course",
              description: "Please Select a Course For This Teacher",
            });
            return;
          }
          formData.append(
            "course",
            selected.map((course) => course.value).join(",")
          );

          const { error, msg } = await addTeacherAction(formData);
          if (error) {
            toast({ title: error, description: "Failed to added New Teacher" });
          } else if (msg) {
            const today = new Date();
            setSelected([]);
            toast({ title: msg, description: `A Teacher Added at ${today}` });
            setLevel("");
            setRank("");
            setGender("");
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
        <div className="mb-3">
          <Label>Select Course</Label>
          <MultiSelect
            value={selected}
            onChange={setSelected}
            options={courseOption}
            labelledBy="Select"
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            {/* Level */}
            <div className="flex flex-col gap-3 mb-4">
              <Label>Level</Label>
              <Select
                name="level"
                value={level}
                onValueChange={(e) => {
                  setLevel(e);
                }}
                required={true}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`Select Level `} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"PRIMARY"}>PRIMARY</SelectItem>
                    <SelectItem value={"SCHOOL"}>SCHOOL</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Rank */}
          <div className="w-1/2">
            <div className="flex flex-col gap-3 mb-4">
              <Label>RANK</Label>
              <Select
                name="rank"
                value={rank}
                onValueChange={(e) => setRank(e)}
                required={true}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`Select Rank `} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"SENIOR"}>SENIOR</SelectItem>
                    <SelectItem value={"ASSISTANT"}>ASSISTANT</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
              <Select
                name="sex"
                value={gender}
                onValueChange={(e) => setGender(e)}
                required={true}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`Select Gender `} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"MALE"}>MALE</SelectItem>
                    <SelectItem value={"FEMALE"}>FEMALE</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
