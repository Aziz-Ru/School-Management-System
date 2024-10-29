"use client";

import { logout } from "@/auth";
import Icon from "../LucidIcon";

const LogoutForm = () => {
  return (
    <form
      action={async () => {
        await logout();
      }}
    >
      <div className="w-full ">
        <button className=" w-full bg-white shadow-sm text-lg flex justify-center items-center lg:justify-start gap-2 py-2 md:px-2 rounded-md hover:site-hover">
          <Icon name="LogOut" size={18} />
          <span className="text-gray-900 hidden lg:block">Logout</span>
        </button>
      </div>
    </form>
  );
};

export default LogoutForm;
