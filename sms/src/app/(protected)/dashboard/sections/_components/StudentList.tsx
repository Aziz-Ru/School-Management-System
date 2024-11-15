import TableList from "@/components/TableList";
import { TableCell, TableRow } from "@/components/ui/table";
import { User } from "@/lib/types";

import { SectionStudentTableColumns } from "@/lib/table_columns";
import MigrateStudentForm from "./MigrateStudentForm";

const StudentList = ({
  students,
  classId,
}: {
  students: User[];
  classId: number;
}) => {
  const renderRow = (student: User) => {
    return (
      <TableRow key={student.id}>
        <TableCell>
          <span>{student.id}</span>
        </TableCell>
        <TableCell className="flex items-center flex-wrap gap-2">
          <span>{student.studentProfile?.first_name}</span>
          <span>{student.studentProfile?.last_name}</span>
        </TableCell>
        <TableCell>
          <span className="text-gray-700">90%</span>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="">
      <div className="">
        <MigrateStudentForm classId={classId} />
      </div>

      {students.length > 0 && (
        <TableList
          columns={SectionStudentTableColumns}
          renderRow={renderRow}
          data={students}
        />
      )}
    </div>
  );
};

export default StudentList;
