import { ITEM_PAR_PAGE } from "@/lib/data";
import prisma from "@/lib/db";
import TeacherList from "./_components/TeacherList";

const Teacher = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const currentPage = page && !isNaN(parseInt(page)) ? parseInt(page) : 1;

  const [teachers, count, courses] = await prisma.$transaction([
    prisma.teacher.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        img: true,
        level: true,
        address: true,
        phone: true,
        courses: {
          select: { courseName: true },
        },
      },
      skip: (currentPage - 1) * ITEM_PAR_PAGE,
      take: ITEM_PAR_PAGE,
    }),
    prisma.teacher.count(),
    prisma.course.findMany({ select: { courseName: true } }),
  ]);
  const courseOption = courses.map((course) => ({
    label: course.courseName,
    value: course.courseName,
  }));

  return (
    <div className="site-bg p-4 m-4 mt-0 flex-1">
      <TeacherList
        teachers={teachers}
        courses={courseOption}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Teacher;
