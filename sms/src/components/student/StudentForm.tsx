"use client";
import FormInput from "@/components/Forms/FormInput";
import FormModal from "@/components/Forms/FormModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { addStudentAction } from "@/lib/actions/student";
import { Classes, Section } from "@/lib/types";
import { useEffect, useReducer, useRef, useState } from "react";

type ActionType =
  | { type: "SET_CLASS_ERROR"; error: string }
  | { type: "SET_SECTION_ERROR"; error: string }
  | { type: "SET_DOB_ERROR"; error: string };

// Define the initial state and reducer
interface ErrorState {
  classError: string;
  sectionError: string;
  dobError: string;
}

const initialErrorState: ErrorState = {
  classError: "",
  sectionError: "",
  dobError: "",
};

function errorReducer(state: ErrorState, action: ActionType): ErrorState {
  switch (action.type) {
    case "SET_CLASS_ERROR":
      return { ...state, classError: action.error };
    case "SET_SECTION_ERROR":
      return { ...state, sectionError: action.error };
    case "SET_DOB_ERROR":
      return { ...state, dobError: action.error };
    default:
      return state;
  }
}

export function AddStudentForm({ classData }: { classData: Classes[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [studentId, setStudentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selected_class_id, setSelected_class_id] = useState<number>(0);
  const [sections, setSections] = useState<Section[]>([]);
  const [state, dispatch] = useReducer(errorReducer, initialErrorState);

  useEffect(() => {
    if (!selected_class_id) {
      dispatch({
        type: "SET_CLASS_ERROR",
        error: "Please select a valid class.",
      });
    } else {
      dispatch({ type: "SET_CLASS_ERROR", error: "" });
    }
  }, [selected_class_id]);

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedYear = new Date(e.target.value).getFullYear();
    const currentYear = new Date().getFullYear();
    if (
      currentYear - selectedYear + selected_class_id <
      selected_class_id + 5
    ) {
      dispatch({
        type: "SET_DOB_ERROR",
        error: `Please select greater than ${selected_class_id + 6} year`,
      });
    } else {
      dispatch({
        type: "SET_DOB_ERROR",
        error: "",
      });
    }
  };

  const onChangeClass = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sid = parseInt(e.target.value);
    const cs = classData.find((cl) => cl.class_id == sid)?.sections;
    setSections(cs ?? []);
    dispatch({ type: "SET_CLASS_ERROR", error: "" });
  };

  const onChangeSection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSection = sections.find(
      (s) => s.section_id == e.target.value
    );
    if (selectedSection) {
      const currentYear = new Date().getFullYear() % 100;
      const diff = currentYear + 10 - selectedSection.class_id! + 2;
      const currenStudents = selectedSection._count!.students! + 1;
      const mStudent = 100 + currenStudents;
      const student_id = `${currentYear}${diff}${selectedSection?.index}${mStudent}`;
      setStudentId(`${student_id}`);
      dispatch({ type: "SET_SECTION_ERROR", error: "" });
    }
  };

  const onSubmitAction = async (formData: FormData) => {
    setIsLoading(true);
    formData.append("student_id", studentId);
    if (formData.get("section_id") == "#") {
      dispatch({ type: "SET_SECTION_ERROR", error: "Please Choose Section" });
      return;
    }

    const { msg, error } = await addStudentAction(formData);
    if (msg) {
      formRef.current?.reset();
      toast({
        title: "Add Student Successfully",
        description: msg,
      });
    }

    if (error) {
      toast({
        title: "Failed to Add Student",
        description: error,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <FormModal table={"Student"}>
      <form ref={formRef} action={onSubmitAction}>
        <div className="w-full flex gap-4">
          {/* Full Name */}
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
          {/* Phone */}
        </div>
        <div className="w-full flex gap-4">
          <FormInput type="email" name="email" label="Email" required={true} />
          <FormInput type="tel" name="phone" label="Phone" required={true} />
        </div>

        <div className="flex gap-4">
          {/* CLASS */}
          <div className="flex flex-col gap-3 mb-4 w-1/2">
            <Label>Class</Label>
            <select onChange={onChangeClass} name="class_id" className="input">
              <option value="#">Class</option>
              {classData.map((class_info, index) => {
                return (
                  <option
                    key={index}
                    value={class_info.class_id}
                    className="text-gray-800"
                  >
                    {class_info.class_name}
                  </option>
                );
              })}
            </select>
            <span className="text-red-600">{state.classError}</span>
          </div>

          {/* SECTION */}
          <div className="flex flex-col gap-3 mb-4 w-1/2">
            <Label>Section</Label>
            <select
              onChange={onChangeSection}
              name="section_id"
              className="input"
            >
              <option className="text-gray-700" value="#">
                Section
              </option>
              {sections.map((section, index) => {
                return (
                  <option
                    className="text-gray-700"
                    key={index}
                    value={section.section_id}
                  >
                    {section.section_name}
                  </option>
                );
              })}
            </select>
            <span className="text-red-600">{state.sectionError}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-3 mb-4 w-1/2">
            {/* ID */}
            <Label>Student ID</Label>
            <Input
              type="text"
              name="student_id"
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
          {/* address */}
          <FormInput
            type="text"
            name="address"
            label="Address"
            required={true}
          />
          <div className="flex flex-col gap-3 mb-4 w-1/2">
            {/* gender */}
            <Label>Gender</Label>
            <select className="input" name="gender">
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4">
          {/* DOB */}
          <div className="">
            <Label>Date Of Birth</Label>
            <input
              onChange={handleDobChange}
              type="date"
              name="dob"
              className="input"
            />
            <span className="text-red-600">{state.dobError}</span>
          </div>
        </div>

        <Button disabled={isLoading} type="submit" className="mt-4 w-full">
          {isLoading ? "Loading..." : "Add Student"}
        </Button>
      </form>
    </FormModal>
  );
}
