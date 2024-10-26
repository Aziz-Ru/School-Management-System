import AddStudentForm from "@/components/features/students/components/StudentForm";
import TableSearch from "@/components/TableSearch";

const StudenListPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  return (
    <div>
      <div className="site-bg p-4 m-4 mt-0 flex-1">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <TableSearch />
          <AddStudentForm />
        </div>
        {/* List */}
        {/* <TableList
          columns={columns}
          renderRow={renderRow}
          data={studentsData}
        /> */}
        {/* Pagination */}
      </div>
    </div>
  );
};

export default StudenListPage;
