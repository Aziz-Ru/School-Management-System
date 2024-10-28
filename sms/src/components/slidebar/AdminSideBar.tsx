import { role } from "@/lib/data";
import LogoutForm from "../Forms/LogoutForm";
import SlideBarLink from "./SlidebarLink";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "LayoutDashboard",
        label: "Dashboard",
        href: "/dashboard",
        visiable: ["admin", "teacher", "student"],
      },

      {
        icon: "Book",
        label: "Course",
        href: "/dashboard/course",
        visiable: ["admin"],
      },
      {
        icon: "School",
        label: "Class",
        href: "/dashboard/class",
        visiable: ["admin"],
      },
      {
        icon: "User",
        label: "Teachers",
        href: "/dashboard/teachers?page=1",
        visiable: ["admin"],
      },

      {
        icon: "Users",
        label: "Students",
        href: "/dashboard/students?page=1",
        visiable: ["admin", "teacher"],
      },

      {
        icon: "BookCheck",
        label: "Exams",
        href: "/dashboard/exams",
        visiable: ["admin", "teacher", "student"],
      },

      {
        icon: "BookCheck",
        label: "Result",
        href: "/dashboard/results",
        visiable: ["admin", "teacher", "student"],
      },

      {
        icon: "Calendar",
        label: "Attendence",
        href: "/dashboard/attendance",
        visiable: ["admin", "teacher", "student"],
      },

      {
        icon: "MessageSquare",
        label: "Annoucements",
        href: "/dashboard/annoucements?page=1",
        visiable: ["admin", "teacher", "student"],
      },
      {
        icon: "Hexagon",
        label: "Authority",
        href: "/dashboard/authority?page=1",
        visiable: ["admin", "teacher", "student"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm site-tsx">
      {menuItems.map((menu) => (
        <div key={menu.title} className="flex flex-col">
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {menu.title}
          </span>

          {menu.items.map((item) => {
            if (item.visiable.includes(role)) {
              return (
                <SlideBarLink
                  icon={item.icon as any}
                  label={item.label}
                  href={item.href}
                  key={item.label}
                />
              );
            }
          })}
        </div>
      ))}
      <div className="">
        <span className="hidden lg:block text-gray-400 font-light my-4">
          OTHERS
        </span>
        <LogoutForm />
      </div>
    </div>
  );
};

export default Menu;
