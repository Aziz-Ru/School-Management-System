import TableSearch from "@/components/TableSearch";
import AddTeacherForm from "@/components/teacher/components/AddTeacherForm";
import TeacherList from "@/components/teacher/components/TeacherList";
import { get_teachers } from "@/lib/controller/get_teachers";
import { Status } from "@/lib/types";
import { notFound } from "next/navigation";

const Teacher = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  // const cookieStore = cookies();
  // const session = cookieStore.get("__session");
  // const { user } = await decrypt(session!.value);
  const user = { role: "ADMIN" };
  // if (user.role !== "ADMIN" && user.role !== "TEACHER") {
  //   notFound();
  // }

  const { page, ...queryParams } = searchParams;
  const currentPage = page && !isNaN(parseInt(page)) ? parseInt(page) : 1;

  const { teachers, subjects, status } = await get_teachers();
  if (status !== Status.OK) {
    notFound();
  }

  // const [teachers, count, courses] = await prisma.$transaction([
  //   prisma.teacher.findMany({
  //     select: {
  //       id: true,
  //       fullName: true,
  //       email: true,
  //       img: true,
  //       level: true,
  //       address: true,
  //       phone: true,
  //       courses: {
  //         select: { courseName: true },
  //       },
  //     },
  //     skip: (currentPage - 1) * ITEM_PAR_PAGE,
  //     take: ITEM_PAR_PAGE,
  //   }),
  //   prisma.teacher.count(),
  //   prisma.course.findMany({ select: { courseName: true } }),
  // ]);

  // const courseOption = courses.map((course) => ({
  //   label: course.courseName,
  //   value: course.courseName,
  // }));

  return (
    <div className="site-bg p-4 m-4 mt-0 flex-1">
      <div className="flex items-center justify-between">
        <TableSearch name="Teacher" />
        {user.role === "ADMIN" && <AddTeacherForm subjects={subjects!} />}
      </div>
      <div>
        {teachers?.length! > 0 && (
          <TeacherList teachers={teachers!} role="ADMIN" />
        )}
      </div>
    </div>
  );
};

export default Teacher;
