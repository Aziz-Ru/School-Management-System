import { decrypt } from "@/session";
import { getClassData } from "@/utils/get_classData";
import { Status } from "@/utils/types";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import CourseView from "../_components/CourseView";
import SectionView from "../_components/SectionView";

const SingleClassPage = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const session = cookieStore.get("__session");
  const { user } = await decrypt(session!.value);

  if (user.role !== "ADMIN" && user.role !== "TEACHER") {
    notFound();
  }

  const classId = parseInt(params.id);
  // Check is it number or not
  if (isNaN(classId)) {
    notFound();
  }
  const level = classId < 6 ? "PRIMARY" : "SCHOOL";
  const { classdata, teachers, subjects, courses, status } = await getClassData(
    classId
  );
  if (status !== Status.OK) {
    notFound();
  }

  const courseOption = courses!.map((course) => ({
    label: course.courseName,
    value: course.courseName,
  }));

  return (
    <div className="grid grid-cols-12">
      {/* Courses */}
      <div className="col-span-12 xl:col-span-6 m-2 rounded border p-4">
        <CourseView
          courses={subjects}
          classId={classId}
          courseOption={courseOption}
          role={user.role}
        />
      </div>

      {/* Sections */}
      <div className=" col-span-12 xl:col-span-6 border p-4 m-2 rounded">
        <SectionView
          classId={classId}
          sections={classdata!.sections}
          teachers={teachers}
          hasSection={classdata!.sections!.length > 0}
          role={user.role}
        />
      </div>
    </div>
  );
};

export default SingleClassPage;
