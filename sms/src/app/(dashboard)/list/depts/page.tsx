import FormModal from "@/components/FormModal";
import TableSearch from "@/components/TableSearch";

const Department = () => {
  return (
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
      {/* <TableList columns={columns} renderRow={renderRow} data={classData} /> */}
    </div>
  );
};

export default Department;
