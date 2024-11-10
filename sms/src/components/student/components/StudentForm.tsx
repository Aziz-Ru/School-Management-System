"use client";
import FormInput from "@/components/Forms/FormInput";
import FormModal from "@/components/Forms/FormModal";
import FormSelect from "@/components/Forms/FormSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useEffect, useRef, useState } from "react";
import { addStudentAction } from "../actions/addstudentAction";

interface ClassData {
  id: number;
  className: string;
  sections: { id: string; sectionName: string }[];
}

export function AddStudentForm({ classData }: { classData: ClassData[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [studentId, setStudentId] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [sections, setSections] = useState<
    { id: string; sectionName: string }[]
  >([]);

  useEffect(() => {
    const getStudentId = async () => {
      const res = await fetch(`/api/section/${selectedSection}`);
      const data = await res.json();
      if (data.id) {
        setStudentId(data.id);
      }
    };

    if (selectedSection) {
      getStudentId();
    }
  }, [selectedSection]);

  return (
    <FormModal table={"Student"}>
      <form
        ref={formRef}
        action={async (formData: FormData) => {
          formData.append("studentId", studentId);
          const { msg, error } = await addStudentAction(formData);
          if (msg) {
            formRef.current?.reset();
            setStudentId("");
            setSelectedClass("");
            setSelectedSection("");
            toast({ title: "Add Student Successfully", description: msg });
          }
          if (error) {
            toast({ title: "Failed to Add Student", description: error });
          }
        }}
      >
        <div className="w-full flex gap-4">
          {/* Full Name */}
          <FormInput
            type="text"
            name="fullName"
            label="Full Name"
            required={true}
          />
          {/* Phone */}
          <FormInput type="tel" name="phone" label="Phone" required={true} />
        </div>
        <div className="flex gap-4">
          {/* CLASS */}
          <div className="flex flex-col gap-3 mb-4 w-1/2">
            <Label>Class</Label>
            <Select
              value={selectedClass}
              onValueChange={(e) => {
                setSelectedClass(e);
                setSections(classData[parseInt(e) - 1].sections);
              }}
              name={"classId"}
              required={true}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select Class `} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Class</SelectLabel>
                  {classData.map((cls) => {
                    return (
                      <SelectItem key={cls.id} value={cls.id.toString()}>
                        {cls.className}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* SECTION */}
          <div className="flex flex-col gap-3 mb-4 w-1/2">
            <Label>Section</Label>
            <Select
              value={selectedSection}
              onValueChange={(e) => {
                setSelectedSection(e);
              }}
              name={"sectionId"}
              required={true}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select Section `} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Section</SelectLabel>
                  {sections.map((section) => {
                    return (
                      <SelectItem key={section.sectionName} value={section.id}>
                        {section.sectionName}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-3 mb-4 w-1/2">
            {/* ID */}
            <Label>Student ID</Label>
            <Input
              type="text"
              name="studentId"
              placeholder="ID"
              defaultValue={studentId}
              disabled
            />
          </div>
          {/* Password */}
          <FormInput
            type="password"
            name="password"
            label="Password"
            required={true}
          />
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
        <div className="flex gap-4">
          {/* DOB */}
          <FormInput
            type="date"
            name="dob"
            label="Date of Birth"
            required={true}
          />
        </div>

        <Button type="submit" className="mt-4 w-full">
          Add
        </Button>
      </form>
    </FormModal>
  );
}
