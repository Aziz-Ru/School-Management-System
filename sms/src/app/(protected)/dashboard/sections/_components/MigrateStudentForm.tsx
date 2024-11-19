"use client";
import FormModal from "@/components/Forms/FormModal";
import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const MigrateStudentForm = ({ classId }: { classId: number }) => {
  const [students, setStudents] = useState<{ label: string; value: string }[]>(
    []
  );

  return (
    <FormModal table="Student">
      <MultiSelect
        value={[]}
        // onChange={setSelected}
        options={students}
        labelledBy="Select"
      />
    </FormModal>
  );
};

export default MigrateStudentForm;
