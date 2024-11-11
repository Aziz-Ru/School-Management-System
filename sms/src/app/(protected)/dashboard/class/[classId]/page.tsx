import { getClassData } from "@/lib/controller/get_classes";
import { Status } from "@/utils/types";
import { notFound } from "next/navigation";
import CourseView from "../_components/CourseView";

const SingleClassPage = async ({ params }: { params: { classId: string } }) => {
  // const cookieStore = cookies();
  // const session = cookieStore.get("__session");
  // const { user } = await decrypt(session!.value);

  // if (user.role !== "ADMIN" && user.role !== "TEACHER") {
  //   notFound();
  // }

  const classId = parseInt(params.classId);
  // Check is it number or not
  if (isNaN(classId)) {
    notFound();
  }

  // get class data
  const { classInfo, teachers, subjects, class_subject, status } =
    await getClassData(classId);

  console.log(status);
  if (status !== Status.OK) {
    notFound();
  }

  const otherSubjects = subjects!.map((course) => ({
    label: course.subject_name,
    value: course.subject_id,
  }));

  return (
    <div className="grid grid-cols-12">
      {/* Courses */}
      <div className="col-span-12 xl:col-span-6 m-2 rounded border p-4">
        <CourseView
          courses={class_subject}
          classId={classId}
          courseOption={otherSubjects}
          role={"ADMIN"}
        />
      </div>

      {/* Sections */}
      <div className=" col-span-12 xl:col-span-6 border p-4 m-2 rounded">
        {/* <SectionView
          classId={classId}
          sections={classdata!.sections}
          teachers={teachers}
          hasSection={classdata!.sections!.length > 0}
          role={user.role}
        /> */}
      </div>
    </div>
  );
};

export default SingleClassPage;
