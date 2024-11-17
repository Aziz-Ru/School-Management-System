import { getClassData } from "@/lib/controller/get_classes";
import { get_rooms } from "@/lib/controller/get_rooms";
import { Status } from "@/lib/types";
import { notFound } from "next/navigation";
import AddCourseForm from "../_components/AddCourseForm";
import AddSectionForm from "../_components/AddSectionForm";
import ClassSubjects from "../_components/ClassSubjectView";
import SectionListTable from "../_components/SectionsTables";

const SingleClassPage = async ({ params }: { params: { classId: string } }) => {
  // const cookieStore = cookies();
  // const session = cookieStore.get("__session");
  // const { user } = await decrypt(session!.value);
  const user = { role: "ADMIN" };
  // if (user.role !== "ADMIN" && user.role !== "TEACHER") {
  //   notFound();
  // }

  const classId = parseInt(params.classId);
  // Check is it number or not
  if (isNaN(classId)) {
    notFound();
  }

  // get class data
  const { classInfo, teachers, subjects, sections, class_subject, status } =
    await getClassData(classId);

  const { rooms } = await get_rooms();

  if (status !== Status.OK) {
    notFound();
  }

  const otherSubjects = subjects!.map((course) => ({
    label: course.subject_name,
    value: course.subject_name,
  }));

  return (
    <div className="p-6">
      <div className="grid grid-cols-12 w-full">
        {/* Courses */}
        <div className="col-span-12 xl:col-span-6 m-2 rounded border p-4">
          <div className="flex gap-2 items-center justify-between p-2 border-b border-gray-200">
            {user.role === "ADMIN" && (
              <AddCourseForm options={otherSubjects} classId={classId} />
            )}
          </div>
          <div className="">
            {class_subject!.length > 0 && (
              <ClassSubjects
                subjects={class_subject!}
                currentPath={`/dashboard/class/${classId}`}
              />
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="col-span-12 xl:col-span-6 border p-4 m-2 rounded">
          <div className="flex gap-2 items-center justify-between p-2 border-b border-gray-200">
            {user.role === "ADMIN" && (
              <AddSectionForm
                classId={classId}
                classTeacher={teachers!}
                rooms={rooms!}
                class_subjects={class_subject!}
              />
            )}
          </div>

          {sections?.length! > 0 && <SectionListTable sections={sections!} />}
        </div>
      </div>
      <div className="pt-10">
        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Previous Exams
        </h1>
      </div>
    </div>
  );
};

export default SingleClassPage;
