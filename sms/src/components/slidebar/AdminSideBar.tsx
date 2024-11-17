import { MenuItems } from "@/lib/data";
import LogoutForm from "../Forms/LogoutForm";
import SlideBarLink from "./SlidebarLink";

const Menu = ({ role }: { role: string }) => {
  return (
    <div className="mt-4 text-sm site-tsx">
      {MenuItems.map((menu) => (
        <div key={menu.title} className="flex flex-col">
          <span className="hidden lg:block text-gray-400  font-light my-4">
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
      <div className="flex flex-col w-full">
        <span className="hidden lg:block text-gray-400 font-light my-4">
          OTHERS
        </span>
        <div className=" flex justify-center items-center lg:justify-start">
          <LogoutForm />
        </div>
      </div>
    </div>
  );
};

export default Menu;
