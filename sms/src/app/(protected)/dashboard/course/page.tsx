import DetailsLink from "@/components/buttons/DetailsLink";
import TableList from "@/components/TableList";
import TableSearch from "@/components/TableSearch";
import { TableCell, TableRow } from "@/components/ui/table";
import { decrypt } from "@/session";
import { getCourses } from "@/utils/get_courses";
import { getTeacherEnrolledCourse } from "@/utils/get_enrolledCourse";
import { Status } from "@/utils/types";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import AddCourseForm from "./_components/AddCourseForm";

const AdminViewColumns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Mark",
    accessor: "mark",
    className: "table-cell text-center",
  },
  {
    header: "Teachers",
    accessor: "teacher",
    className: "hidden sm:table-cell text-center",
  },
  {
    header: "Action",
    accessor: "action",
    className: "text-center",
  },
];

const TeacherViewColumns = [
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Section",
    accessor: "section",
  },
  {
    header: "Course",
    accessor: "course",
  },

  {
    header: "Action",
    accessor: "action",
  },
];

type Course = {
  courseName: string;
  mark: number;
  _count: { teachers: number };
};

const CourseListPage = async () => {
  const cookieStore = cookies();
  const session = cookieStore.get("__session");
  const { user } = await decrypt(session!.value);

  if (user.role === "ADMIN") {
    const { courses, status } = await getCourses();
    if (status !== Status.OK) {
      notFound();
    }

    const renderRow = (item: Course) => {
      return (
        <TableRow key={item.courseName}>
          <TableCell className="table-cell px-1">{item.courseName}</TableCell>
          <TableCell className="table-cell text-center">{item.mark}</TableCell>
          <TableCell className="hidden sm:table-cell text-center">
            {item._count.teachers}
          </TableCell>
          <TableCell className="text-center">
            <DetailsLink href={`/dashboard/course/${item.courseName}`} />
          </TableCell>
        </TableRow>
      );
    };
    return (
      <div className="site-bg p-4 m-4 mt-0 flex-1">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <TableSearch />
          {user.role === "ADMIN" && <AddCourseForm />}
        </div>
        {/* List */}
        <TableList
          columns={AdminViewColumns}
          renderRow={renderRow}
          data={courses!}
        />
        {/* Pagination */}
      </div>
    );
  }

  if (user.role === "TEACHER") {
    const uid = parseInt(user.id);
    if (isNaN(uid)) {
      notFound();
    }
    const { subjects, status } = await getTeacherEnrolledCourse(uid);
    if (status !== Status.OK) {
      notFound();
    }

    if (subjects?.length === 0) {
      return <div>Your Enrolled Course are null</div>;
    }

    const renderRow = (item: any) => {
      return (
        <TableRow key={item.id}>
          <TableCell>{item.classId}</TableCell>
          <TableCell>{item.sectionName!}</TableCell>
          <TableCell>{item.courseName}</TableCell>
          <TableCell>Exam</TableCell>
        </TableRow>
      );
    };

    return (
      <div className="p-4 m-4 mt-0 flex-1">
        <h1 className="font-bold text-2xl mb-4">Enrolled Course</h1>

        <TableList
          data={subjects!}
          columns={TeacherViewColumns}
          renderRow={renderRow}
        />
      </div>
    );
  }
};

export default CourseListPage;
