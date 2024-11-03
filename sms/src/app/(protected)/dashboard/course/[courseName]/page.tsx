import { get_teacher_by_course } from "@/lib/utils/get_teacher_by_course";
import { Status } from "@/lib/utils/types";
import Teacher_card from "../_components/teacher_card";

const Course = async ({ params }: { params: { courseName: string } }) => {
  const { teachers, status } = await get_teacher_by_course(params.courseName);
  if (status === Status.INTERNAL_SERVER_ERROR) {
    return <div>Internal server error</div>;
  }
  if (status === Status.NOT_FOUND) {
    return <div>Course not found</div>;
  }

  return (
    <div className="p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">{params.courseName} Teachers</h1>
      <div className="flex flex-wrap gap-8">
        {teachers?.map((teacher, index) => (
          <Teacher_card key={index} profile={teacher} />
        ))}
      </div>
    </div>
  );
};

export default Course;
