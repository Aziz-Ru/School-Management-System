import StudentsList from "@/components/features/students/student_list";

const StudenListPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  return (
    <div>
      <StudentsList searchParams={searchParams} />
    </div>
  );
};

export default StudenListPage;
