import NavLink from "./NavbarActiveLink";

const SectionNavbar = ({ sectionId }: { sectionId: string }) => {
  const paths = [
    { name: "Section", path: `/dashboard/sections/${sectionId}` },
    { name: "Attendance", path: `/dashboard/sections/${sectionId}/attendance` },
    { name: "Routine", path: `/dashboard/sections/${sectionId}/routine` },
  ];

  return (
    <div className="shadow">
      <div className="mx-auto max-w-screen-xl ">
        <div className="p-4">
          <div className="flex items-center  md:gap-6 justify-center w-full">
            {paths.map((path) => (
              <NavLink key={path.name} path={path.path} name={path.name} />
            ))}
          </div>
        </div>
      </div>
      <hr className="border-gray-300" />
    </div>
  );
};

export default SectionNavbar;
