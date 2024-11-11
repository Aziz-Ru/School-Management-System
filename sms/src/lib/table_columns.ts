export const classListColumns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Level",
    accessor: "level",
    className: "hidden sm:table-cell",
  },

  {
    header: "Sections",
    accessor: "sections",
    className: "hidden sm:table-cell",
  },

  {
    header: "Courses",
    accessor: "courses",
    className: "hidden sm:table-cell",
  },
  {
    header: "Action",
    accessor: "action",
  },
];


export const AdminCourseViewColumns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Mark",
    accessor: "mark",
    className: "table-cell text-center",
  },
  {
    header: "Teachers",
    accessor: "teacher",
    className: "hidden sm:table-cell text-center",
  },
  {
    header: "Action",
    accessor: "action",
    className: "text-center",
  },
];

export const TeacherCourseViewColumns = [
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Section",
    accessor: "section",
  },
  {
    header: "Course",
    accessor: "course",
  },

  {
    header: "Action",
    accessor: "action",
  },
];
