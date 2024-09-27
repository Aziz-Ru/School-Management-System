import FormModal from "@/components/FormModal";
import TableList from "@/components/TableList";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/db";

const facultyColumns = [
  { header: "Faculty Name", accessor: "facultyName" },
  { header: "Actions", accessor: "actions" },
];
const deptColumns = [
  { header: "Dept Name", accessor: "deptName" },
  { header: "Actions", accessor: "actions" },
];
interface Faculty {
  id: string;
  facultyName: string;
}

const Department = async () => {
  const facultyData = await prisma.faculty.findMany();
  const deptData = await prisma.department.findMany();
  return (
    <div className="">
      {/* Faculty */}
      <div className="site-bg p-4 m-4 mt-0 flex-1">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">Faculty</h1>
          <div className="flex items-center gap-4 flex-col md:flex-row w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-4 md:self-auto self-end ">
              <FormModal type="add" table="faculty" />
            </div>
          </div>
        </div>
        {/* List */}
        <TableList
          columns={facultyColumns}
          renderRow={renderFacultyRow}
          data={facultyData}
        />
      </div>
      {/* Departments */}
      <div className="site-bg p-4 m-4 mt-0 flex-1">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">Department</h1>
          <div className="flex items-center gap-4 flex-col md:flex-row w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-4 md:self-auto self-end ">
              <FormModal type="add" table="department" data={facultyData} />
            </div>
          </div>
        </div>
        {/* List */}
        <TableList
          columns={deptColumns}
          renderRow={renderFacultyRow}
          data={deptData}
        />
      </div>
    </div>
  );
};

const renderFacultyRow = (item: Faculty) => {
  return (
    <tr
      key={item.id}
      className="border-b site-border odd:bg-zinc-100 dark:odd:bg-slate-700 even:bg-gray-200 dark:even:bg-gray-700 hover:bg-purple-200 dark:hover:bg-gray-600"
    >
      <td className="flex items-center gap-4 p-3 ">
        <h3 className="font-semibold">{item.facultyName}</h3>
      </td>
      <td>
        <div className="flex items-center gap-4">
          <FormModal type="edit" table="faculty" data={item} />
          <FormModal type="delete" table="faculty" id={parseInt(item.id)} />
        </div>
      </td>
    </tr>
  );
};
export default Department;
