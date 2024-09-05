"use server";

import { courseSchema } from "@/lib/schema/Schema";

interface ReturnProps {
  error: string;
  success: string;
}

export const addCourse = ({
  formData,
  classId,
}: {
  formData: FormData;
  classId: string;
}) => {
  try {
    const res = courseSchema.safeParse({
      courseName: formData.get("courseName"),
      totalMarks: formData.get("totalMarks"),
      classId: classId,
    });
    if (!res.success) {
      const err = res.error.issues[0].message;
      return { error: err, success: "" };
    }
    
  } catch (error) {

  }
};
