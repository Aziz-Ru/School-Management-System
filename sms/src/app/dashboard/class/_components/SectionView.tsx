import DetailsLink from "@/components/buttons/DetailsLink";
import TableList from "@/components/TableList";
import TableSearch from "@/components/TableSearch";
import { TableCell, TableRow } from "@/components/ui/table";
import AddSectionForm from "./AddSectionForm";

const sectionColumns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Students",
    accessor: "students",
    className: "hidden sm:table-cell",
  },
  {
    header: "Year",
    accessor: "year",
    className: "hidden sm:table-cell",
  },
  {
    header: "Super Visor",
    accessor: "supervisor",
    className: "hidden sm:table-cell",
  },

  {
    header: "Action",
    accessor: "actions",
    className: "text-center",
  },
];

type Section = {
  id: string;
  sectionName: string;
  _count: {
    students: number;
  };
  level: string;
  sectionTeacher: { fullName: string };
  year: number;
  classId: number;
};

const SectionView = ({
  classId,
  teachers,
  hasSection,
  sections,
}: {
  classId: number;
  teachers: any;
  hasSection: boolean;
  sections: any;
}) => {
  sections = sections.map((section: any) => {
    return {
      ...section,
      classId: classId,
    };
  });

  return (
    <div className="site-bg p-4 m-4 mt-0  col-span-12 lg:col-span-5">
      {/* TOP */}
      <div className="flex gap-2 items-center justify-between">
        <TableSearch />
        <AddSectionForm classId={classId} classTeacher={teachers} />
      </div>

      {/* List */}
      {hasSection && (
        <TableList
          columns={sectionColumns}
          renderRow={renderSectionRow}
          data={sections}
        />
      )}
    </div>
  );
};

const renderSectionRow = (item: Section) => {
  return (
    <TableRow key={item.id}>
      <TableCell className="flex items-center p-3 ">
        <h3 className="font-semibold">{item.sectionName}</h3>
      </TableCell>
      <TableCell className="px-2">
        <span className="hidden sm:block">{item._count.students}</span>
      </TableCell>
      <TableCell className="px-2">
        <span className="hidden sm:block">{item.year}</span>
      </TableCell>
      <TableCell className="px-2">
        <span className="hidden sm:block">
          {item.sectionTeacher ? item.sectionTeacher.fullName : "Not Assigned"}
        </span>
      </TableCell>

      <TableCell className="px-2">
        <DetailsLink
          href={`/dashboard/class/${item.classId}/${
            item.id
          }?date=${new Date().toLocaleDateString()}`}
        />
      </TableCell>
    </TableRow>
  );
};

export default SectionView;
