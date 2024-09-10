import AddEmployee from "@/components/employee/AddEmployee";
import prisma from "@/lib/db";

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
      lastName: true,
      department: {
        select: { deptName: true },
      },
    },
  });
  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-2 lg:gap-4 lg:grid-cols-2">
          <AddEmployee departments={departments} />
          <div className="w-full flex justify-center items-start">
            <div className="flex flex-col w-full">
              <h1 className="text-center text-xl font-medium mb-4">
                EMPLOYEES
              </h1>
              <div className="w-full ">
                {dbEmployees.map((employee) => {
                  return (
                    <div
                      key={employee.id}
                      className="w-full flex justify-between my-1 border site-border rounded-md p-2"
                    >
                      <div>
                        {employee.firstName} {employee.lastName}
                      </div>
                      <div>{employee.department?.deptName}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
