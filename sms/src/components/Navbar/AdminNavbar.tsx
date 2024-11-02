import Image from "next/image";
import DropdownAcademic from "./DropdownAcademic";
import DropdownAchivement from "./DropdownAchivement";
import DropdownSchool from "./DropdownSchool";

const AdminNavbar = async ({ user }: { user: any }) => {
  return (
    <div className="flex bg-indigo-800 text-white items-center justify-around p-4 shadow">
      {/* Navbar */}
      <div className="flex gap-4">
        <DropdownSchool />
        <DropdownAcademic />
        <DropdownAchivement />
      </div>

      {/* Icons And User */}
      <div className="flex gap-6">
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">{user.fullName}</span>
          <span className="text-[10px] text-right text-gray-100 dark:text-gray-600">
            {user.role}
          </span>
        </div>
        <Image
          src={"/image/noavatar.png"}
          width={36}
          height={36}
          className="rounded-full"
          alt="Avatar"
        />
      </div>
    </div>
  );
};

export default AdminNavbar;
