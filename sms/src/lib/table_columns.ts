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

export const RoomTableColumns = [
  {
    header: "Room Number",
    accessor: "room_number",
  },
  {
    header: "Floor",
    accessor: "floor",
  },
  {
    header: "Building",
    accessor: "building",
  },

  {
    header: "Capacity",
    accessor: "capacity",
  },
];

export const sectionsTableColumns = [
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Students",
    accessor: "students",
    className: "hidden sm:table-cell",
  },
  {
    header: "Academic Year",
    accessor: "year",
    className: "hidden sm:table-cell",
  },
  {
    header: "Room Number",
    accessor: "room_number",
    className: "hidden sm:table-cell",
  },
  {
    header: "Class Teacher",
    accessor: "class_teacher",
    className: "hidden md:table-cell",
  },

  {
    header: "Action",
    accessor: "actions",
  },
];

export const StudentTableListColumn = [
  {
    header: "Name",
    accessor: "info",
  },

  {
    header: "Section",
    accessor: "section",
    className: "hidden md:table-cell",
  },

  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden xl:table-cell",
  },
  {
    header: "Last Login",
    accessor: "last_login",
    className: "hidden xl:table-cell",
  },

  {
    header: "Action",
    accessor: "action",
  },
];


export const SectionStudentTableColumns = [
  {
    header: "ID",
    accessor: "id",
  },
  {
    header: "Name",
    accessor: "name",
    className: "",
  },
  {
    header: "Attedance",
    accessor: "attendance",
  },
];