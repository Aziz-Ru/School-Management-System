import TableSearch from "@/components/TableSearch";
import { getClassesInfos } from "@/lib/controller/get_classes";
import { Status } from "@/lib/types";
import { notFound } from "next/navigation";
import AddClassForm from "./_components/AddClassForm";
import ClassList from "./_components/ClassList";

const ClassListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const searchQuery = searchParams.q ? searchParams.q : undefined;

  const { classes, status } = await getClassesInfos(searchQuery as string);

  if (status != Status.OK) {
    notFound();
  }

  return (
    <div className="site-bg p-4 m-4 mt-0 flex-1">
      <div className="flex items-center justify-between">
        <TableSearch name="Class Name" />
        {classes!.length === 0 && <AddClassForm />}
      </div>
      <div>
        <ClassList classList={classes!} />
      </div>
    </div>
  );
};

export default ClassListPage;
