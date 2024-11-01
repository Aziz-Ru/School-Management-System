import { DeleteButton, EditButton } from "@/components/buttons/Buttons";
import TableList from "@/components/TableList";
import TableSearch from "@/components/TableSearch";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "@/lib/data";
import SelectCourseForm from "./SelectCourseForm";

const courseColumns = [
  {
    header: "Info",
    accessor: "info",
    className: "px-2",
  },
  {
    header: "Action",
    accessor: "action",
    className: "text-center",
  },
];

type Course = {
  courseName: string;
  enrolledTeacher: string;
};

const CourseView = ({
  courseOption,
  classId,
  courses,
  role,
}: {
  classId: number;
  courseOption: any;
  courses: any;
  role: "ADMIN" | "TEACHER";
}) => {
  return (
    <>
      {/* TOP */}
      <div className="flex gap-2 items-center justify-between p-2 border-b border-gray-200">
        <TableSearch />
        {role === "ADMIN" && (
          <SelectCourseForm options={courseOption} classId={classId} />
        )}
      </div>
      {/* List */}
      {courses.length > 0 && (
        <TableList
          columns={courseColumns}
          renderRow={renderCourseTableRow}
          data={courses}
        />
      )}
    </>
  );
};

const renderCourseTableRow = (item: Course) => {
  return (
    <TableRow key={item.courseName}>
      <TableCell className="flex items-center p-3 ">
        <h3 className="font-semibold">{item.courseName}</h3>
      </TableCell>

      <TableCell className="px-2">
        {role === "admin" && (
          <div className="flex gap-4 items-center justify-center ">
            <EditButton />
            <DeleteButton />
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default CourseView;
