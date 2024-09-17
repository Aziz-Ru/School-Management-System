import Link from "next/link";
import {
  HiAcademicCap,
  HiCalendar,
  HiChartBar,
  HiHome,
  HiLogout,
  HiNewspaper,
  HiSparkles,
  HiUser,
  HiUserGroup,
} from "react-icons/hi";
import { HiClipboardDocument, HiCog6Tooth } from "react-icons/hi2";
const Menu = () => {
  const menuItems = [
    {
      title: "MENU",
      items: [
        {
          icon: HiHome,
          label: "Home",
          href: "/",
        },
        {
          icon: HiAcademicCap,
          label: "Teacher",
          href: "/teacher",
        },
        {
          icon: HiUserGroup,
          label: "Student",
          href: "/student",
        },
        {
          icon: HiNewspaper,
          label: "Classes",
          href: "/classes",
        },
        {
          icon: HiSparkles,
          label: "Exams",
          href: "/exams",
        },
        {
          icon: HiChartBar,
          label: "Attendence",
          href: "/attendance",
        },
        {
          icon: HiCalendar,
          label: "Event",
          href: "/event",
        },
        {
          icon: HiClipboardDocument,
          label: "Annoucements",
          href: "/annoucements",
        },
      ],
    },
    {
      title: "OTHER",
      items: [
        {
          icon: HiUser,
          label: "Profile",
          href: "/profile",
        },
        {
          icon: HiCog6Tooth,
          label: "Settings",
          href: "/settings",
        },
        {
          icon: HiLogout,
          label: "Logout",
          href: "/logout",
        },
      ],
    },
  ];
  return (
    <div className="mt-4 text-sm site-tsx">
      {menuItems.map((menu) => (
        <div key={menu.title} className="flex flex-col">
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {menu.title}
          </span>
          {menu.items.map((item) => (
            <Link
              className="flex justify-center items-center lg:justify-start gap-4 py-2 "
              key={item.href}
              href={item.href}
            >
              <item.icon className="h-5 w-5" />
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
