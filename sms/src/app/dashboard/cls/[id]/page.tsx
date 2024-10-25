import CourseView from "@/components/features/classes/components/CourseView";
import SectionView from "@/components/features/classes/components/SectionView";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

const SingleClassPage = async ({ params }: { params: { id: string } }) => {
  const classId = parseInt(params.id);
  // Check is it number or not
  if (isNaN(classId)) {
    notFound();
  }
  const level = classId < 6 ? "PRIMARY" : "SCHOOL";

  const [classData, courses, teachers] = await prisma.$transaction([
    prisma.class.findFirst({
      where: { id: classId },
      include: {
        sections: {
          select: {
            id: true,
            sectionName: true,
            year: true,
            sectionTeacher: {
              select: {
                fullName: true,
              },
            },
            _count: { select: { students: true } },
          },
          orderBy: {
            year: "desc",
          },
        },
      },
    }),
    prisma.subject.findMany({
      where: { classId: classId },
      select: { course: { select: { courseName: true } } },
    }),
    prisma.teacher.findMany({
      where: { level },
      select: {
        id: true,
        fullName: true,
      },
    }),
  ]);

  if (!classData) {
    notFound();
  }

  const existingCourse = courses.map((data, index) => ({
    courseName: data.course.courseName,
  }));

  const notExistCourses = await prisma.course.findMany({
    where: {
      NOT: {
        courseName: { in: existingCourse.map((data) => data.courseName) },
      },
    },
  });

  const courseOption = notExistCourses.map((course) => ({
    label: course.courseName,
    value: course.courseName,
  }));

  return (
    <div className="grid grid-cols-12">
      {/* Courses */}
      <div className="col-span-12 xl:col-span-6 m-2 rounded border p-4">
        <CourseView
          courses={existingCourse}
          classId={classId}
          courseOption={courseOption}
        />
      </div>

      {/* Sections */}
      <div className=" col-span-12 xl:col-span-6 border p-4 m-2 rounded">
        <SectionView
          classId={classId}
          sections={classData.sections}
          teachers={teachers}
          hasSection={classData.sections.length > 0}
        />
      </div>
    </div>
  );
};

export default SingleClassPage;
