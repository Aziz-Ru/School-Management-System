import TeacherList from "@/components/features/teachers/teacher_list";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell ",
  },
  {
    header: "Level",
    accessor: "level",
    className: "hidden md:table-cell ",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell ",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden xl:table-cell ",
  },
  {
    header: "Action",
    accessor: "action",
    className: "table-cell text-center",
  },
];

type Teacher = {
  id: string;
  fullName: string;
  email: string;
  img: string;
  address: string;
  level: string;
  phone: string;
};

const Teacher = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  return (
    <div className="site-bg p-4 m-4 mt-0 flex-1">
      <TeacherList searchParams={searchParams} />
    </div>
  );
};

export default Teacher;
