import Image from "next/image";

const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-around p-4 shadow">
      {/* Search Bar */}
      <div className="flex justify-center items-center gap-2 site-border border rounded-full p-2">
        
        <input
          className=" outline-none site-bg  "
          type="text"
          placeholder="Search..."
        />
      </div>
      {/* Icons And User */}
      <div className="flex gap-6">
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">Jhon Doe</span>
          <span className="text-[10px] text-right text-gray-500 dark:text-gray-600">
            Admin
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
