import DetailsLink from "@/components/buttons/DetailsLink";
import TableList from "@/components/TableList";
import { TableCell, TableRow } from "@/components/ui/table";
import { get_subjects } from "@/lib/controller/get_subjects";
import { AdminCourseViewColumns } from "@/lib/table_columns";
import { Status, Subject } from "@/lib/types";
import { notFound } from "next/navigation";
import AddSubjectForm from "./_components/AddSubjectForm";

const CourseListPage = async () => {
  // const cookieStore = cookies();
  // const session = cookieStore.get("__session");
  // const { user } = await decrypt(session!.value as string);
  const user = { role: "ADMIN" };
  if (user.role === "ADMIN") {
    const { subjects, status } = await get_subjects();
    if (status !== Status.OK) {
      notFound();
    }

    const renderRow = (item: Subject) => {
      return (
        <TableRow key={item.subject_id}>
          <TableCell className="table-cell px-1">{item.subject_name}</TableCell>
          <TableCell className="table-cell text-center">
            {item.subject_code}
          </TableCell>
          <TableCell className="hidden sm:table-cell text-center">
            {item._count?.teacher}
          </TableCell>
          <TableCell className="text-center">
            <DetailsLink href={`/dashboard/course/${item.subject_id}`} />
          </TableCell>
        </TableRow>
      );
    };
    return (
      <div className="site-bg p-4 m-4 mt-0 flex-1">
        {/* TOP */}
        <div className="flex items-center justify-between">
          {user.role === "ADMIN" && <AddSubjectForm />}
        </div>
        {/* List */}
        {subjects!.length > 0 && (
          <TableList
            columns={AdminCourseViewColumns}
            renderRow={renderRow}
            data={subjects!}
          />
        )}
        {/* Pagination */}
      </div>
    );
  }

  // if (user.role === "TEACHER") {
  //   const uid = parseInt(user.id);
  //   if (isNaN(uid)) {
  //     notFound();
  //   }
  //   const { subjects, status } = await getTeacherEnrolledCourse(uid);
  //   if (status !== Status.OK) {
  //     notFound();
  //   }

  //   if (subjects?.length === 0) {
  //     return <div>Your Enrolled Course are null</div>;
  //   }

  //   const renderRow = (item: any) => {
  //     return (
  //       <TableRow key={item.id}>
  //         <TableCell>{item.classId}</TableCell>
  //         <TableCell>{item.sectionName!}</TableCell>
  //         <TableCell>{item.courseName}</TableCell>
  //         <TableCell>Exam</TableCell>
  //       </TableRow>
  //     );
  //   };

  //   return (
  //     <div className="p-4 m-4 mt-0 flex-1">
  //       <h1 className="font-bold text-2xl mb-4">Enrolled Course</h1>

  //       <TableList
  //         data={subjects!}
  //         columns={TeacherViewColumns}
  //         renderRow={renderRow}
  //       />
  //     </div>
  //   );
  // }
};

export default CourseListPage;
