import AddEmployee from "@/components/employee/AddEmployee";
import prisma from "@/lib/db";
import Link from "next/link";

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
    <div className="max-w-screen-xl mx-auto">
      <div className="px-4">
        <div className="grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-2">
          <div>
            <AddEmployee departments={departments} />
          </div>

          <div className="w-full">
            <div>
              <h1 className="text-center text-2xl font-medium mb-4">
                EMPLOYEES
              </h1>
            </div>
            <div className="max-w-screen-sm mx-auto ">
              <div className="w-full flex border site-border">
                <div className="w-1/4 py-2 text-center border-r site-border">
                  <span>ID</span>
                </div>
                <div className="w-1/4 py-2 text-center border-r site-border">
                  <span>Name</span>
                </div>
                <div className="w-1/4 py-2 text-center border-r site-border">
                  <span>Department</span>
                </div>
                <div className="w-1/4 py-2 text-center">
                  <span>View</span>
                </div>
              </div>
              {dbEmployees.length ? (
                <div className="border-b site-border">
                  {dbEmployees.map((employee) => {
                    return (
                      <div
                        key={employee.id}
                        className="w-full border-x site-border flex "
                      >
                        <div className="w-1/4 py-2 text-center border-r site-border">
                          {employee.employeeId}
                        </div>
                        <div className="w-1/4 py-2 text-center border-r site-border">
                          {employee.firstName} {employee.lastName}
                        </div>
                        <div className="w-1/4 py-2 text-center border-r site-border">
                          {employee.department?.deptName}
                        </div>
                        <div className="w-1/4 py-2 text-center border-r site-border">
                          <Link
                            className="link-btn px-2 py-1"
                            href={`/admin/employee/${employee.id}`}
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center">No Employees Found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
