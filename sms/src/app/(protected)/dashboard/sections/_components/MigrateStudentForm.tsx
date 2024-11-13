"use client";
import FormModal from "@/components/Forms/FormModal";
import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const MigrateStudentForm = ({ classId }: { classId: number }) => {
  const [students, setStudents] = useState<{ label: string; value: string }[]>(
    []
  );

  // useEffect(() => {
  //   const getStudents = async () => {
  //     try {
  //       const response = await fetch(`/api/students?classId=${classId}`);
  //       const res = await response.json();
  //       if (res.data) {
  //         const studentData = res.data.map((student: any) => {
  //           return {
  //             label: `${student.id} \t\t LastExamStatus: ${student.lastExamStatus}`,
  //             value: student.id.toString(),
  //           };
  //         });
  //         setStudents(studentData);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getStudents();
  // }, [classId]);

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
