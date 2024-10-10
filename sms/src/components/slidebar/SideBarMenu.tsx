import { role } from "@/lib/data";
import Link from "next/link";

import { FaLayerGroup } from "react-icons/fa";

import {
  HiAcademicCap,
  HiChartBar,
  HiClipboard,
  HiHome,
  HiSparkles,
  HiUser,
  HiUserGroup,
} from "react-icons/hi";
import {
  HiArrowLeftOnRectangle,
  HiBuildingOffice,
  HiCog6Tooth,
} from "react-icons/hi2";
const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: HiHome,
        label: "Home",
        href: "/admin",

        visiable: ["admin", "teacher", "student"],
      },
      {
        icon: HiAcademicCap,
        label: "Teachers",
        href: "/list/teachers?page=1",
        visiable: ["admin"],
      },
      {
        icon: HiUserGroup,
        label: "Students",
        href: "/list/students?page=1",
        visiable: ["admin", "teacher"],
      },
      {
        icon: HiBuildingOffice,
        label: "Classes",
        href: "/list/cls",
        visiable: ["admin"],
      },
      {
        icon: FaLayerGroup,
        label: "Departments",
        href: "/list/depts",
        visiable: ["admin"],
      },

      {
        icon: HiSparkles,
        label: "Exams",
        href: "/list/exams",
        visiable: ["admin", "teacher", "student"],
      },
      {
        icon: HiChartBar,
        label: "Attendence",
        href: "/list/attendance",
        visiable: ["admin", "teacher", "student"],
      },

      {
        icon: HiClipboard,
        label: "Annoucements",
        href: "/list/annoucements?page=1",
        visiable: ["admin", "teacher", "student"],
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
        visiable: ["admin", "teacher", "student"],
      },
      {
        icon: HiCog6Tooth,
        label: "Settings",
        href: "/settings",
        visiable: ["admin", "teacher", "student"],
      },
      {
        icon: HiArrowLeftOnRectangle,
        label: "Logout",
        href: "/logout",
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
                <Link
                  key={item.label}
                  className="text-lg flex justify-center items-center lg:justify-start gap-2 py-2 md:px-2 rounded-md hover:site-hover "
                  href={item.href}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
