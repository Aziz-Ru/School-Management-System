"use client";
import FormInput from "@/components/Forms/FormInput";
import FormModal from "@/components/Forms/FormModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const classData = [
  { label: "One", value: "1" },
  { label: "Two", value: "2" },
  { label: "Three", value: "3" },
  { label: "Four", value: "4" },
  { label: "Five", value: "5" },
  { label: "Six", value: "6" },
  { label: "Seven", value: "7" },
  { label: "Eight", value: "8" },
  { label: "Nine", value: "9" },
  { label: "Ten", value: "10" },
];

export default function AddStudentForm() {
  const [selectedClass, setSelectedClass] = useState(classData[0].value);
  const [selectedSection, setSelectedSection] = useState("");
  const [studentId, setStudentId] = useState("");
  const [sections, setSections] = useState<
    { id: string; sectionName: string }[]
  >([]);

  useEffect(() => {
    const getSection = async () => {
      try {
        const response = await fetch(`/api/class/${selectedClass}`);
        const res = await response.json();
        setSections(res.sections);
      } catch (error) {}
    };
    getSection();
  }, [selectedClass]);

  useEffect(() => {
    if (selectedSection) {
      const getStudentId = async () => {
        try {
          const response = await fetch(`/api/section/${selectedSection}`);
          const res = await response.json();
          setStudentId(res.id);
        } catch (error) {
          // console.log(error);
        }
      };
      getStudentId();
    }
  }, [selectedSection]);

  return (
    <FormModal table={"Student"}>
      <form
        action={(formData: FormData) => {
          console.log(formData);
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
              onValueChange={(e) => {
                setSelectedClass(e);
              }}
              name={"classId"}
              required={true}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select Class `} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {classData.map((cls) => {
                    return (
                      <SelectItem key={cls.label} value={cls.value}>
                        {cls.label}
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
