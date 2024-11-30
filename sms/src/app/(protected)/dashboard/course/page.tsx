import TableList from "@/components/TableList";
import { TableCell, TableRow } from "@/components/ui/table";
import { get_subjects } from "@/lib/controller/get_subjects";
import { AdminCourseViewColumns } from "@/lib/table_columns";
import { Status, Subject } from "@/lib/types";
import { decrypt } from "@/session";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import AddSubjectForm from "./_components/AddSubjectForm";
import EditSubjectForm from "./_components/EditSubject";

const CourseListPage = async () => {
  const cookieStore = cookies();
  const session = cookieStore.get("__session");
  const { user } = await decrypt(session!.value as string);

  const { subjects, status } = await get_subjects();
  if (status !== Status.OK) {
    notFound();
  }

  const renderRow = (item: Subject) => {
    return (
      <TableRow key={item.subject_name}>
        <TableCell className="table-cell px-1 border-r">
          {item.subject_name}
        </TableCell>
        <TableCell className="table-cell text-center border-r">
          {item.subject_code}
        </TableCell>
        <TableCell className="hidden sm:table-cell text-center border-r">
          {item._count?.teacher}
        </TableCell>
        <TableCell>
          <div className="flex justify-center">
            {user.role === "ADMIN" ? (
              <div>
                <EditSubjectForm data={item} />
              </div>
            ) : (
              <div>No Action</div>
            )}
          </div>
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
};

export default CourseListPage;
