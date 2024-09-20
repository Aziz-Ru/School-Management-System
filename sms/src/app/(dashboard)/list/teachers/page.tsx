import Pagination from "@/components/Pagination";
import TableList from "@/components/TableList";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/db";
import { HiPlus } from "react-icons/hi";
import {
  HiAdjustmentsHorizontal,
  HiAdjustmentsVertical,
} from "react-icons/hi2";

const Employee = async () => {
  const dbDepts = await prisma.department.findMany({
    select: { id: true, deptName: true },
  });
  const departments = dbDepts.map((department) => ({
    id: department.id,
    value: department.deptName,
  }));
  const dbEmployees = await prisma.employee.findMany({
    select: {
      id: true,
      firstName: true,
      employeeId: true,
      lastName: true,
      department: {
        select: { deptName: true },
      },
    },
  });
  return (
    <div className="site-bg p-4 m-4 mt-0 flex-1">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex items-center gap-4 flex-col md:flex-row w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 md:self-auto self-end ">
            <button>
              <HiAdjustmentsHorizontal className="w-5 h-5 site-txt" />
            </button>
            <button>
              <HiAdjustmentsVertical className="w-5 h-5 site-txt" />
            </button>
            <button>
              <HiPlus className="w-5 h-5 site-txt" />
            </button>
          </div>
        </div>
      </div>
      {/* List */}
      <TableList />
      {/* Pagination */}
      <div className="">
        <Pagination />
      </div>
    </div>
  );
};

export default Employee;
