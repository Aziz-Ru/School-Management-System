import TableList from "@/components/TableList";
import { TableCell, TableRow } from "@/components/ui/table";
import { Student } from "../../../../../utils/types";
import MigrateStudentForm from "./MigrateStudentForm";

const StudentList = ({
  students,
  classId,
}: {
  students: Student[];
  classId: number;
}) => {
  const columns = [
    {
      header: "ID",
      accessor: "id",
    },
    {
      header: "Name",
      accessor: "name",
      className: "",
    },
    {
      header: "Attednece",
      accessor: "attendance",
    },
  ];

  const renderRow = (student: Student) => {
    return (
      <TableRow key={student.id}>
        <TableCell>
          <span>{student.id}</span>
        </TableCell>
        <TableCell>
          <span>{student.fullName}</span>
        </TableCell>
        <TableCell>
          <span>90%</span>
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
        <TableList columns={columns} renderRow={renderRow} data={students} />
      )}
    </div>
  );
};

export default StudentList;
