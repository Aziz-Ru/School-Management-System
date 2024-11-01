import { decrypt } from "@/session";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import Menus from "./Menus";

const Navbar = async () => {
  const session = cookies().get("__session")?.value;
  const { user } = await decrypt(session);

  return (
    <header className="top-0 left-0 w-full z-50  shadow">
      <nav className="bg-indigo-700 text-white">
        <div className="max-w-screen-xl mx-auto  flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            {user ? (
              <Link href={"/profile"}>
                <div className="flex gap-4 px-4 py-3.5">
                  <Image
                    src={"/image/noavatar.png"}
                    width={36}
                    height={36}
                    className="rounded-full"
                    alt="Avatar"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs leading-3 font-medium">
                      Jhon Doe
                    </span>
                    <span className="text-[10px] text-right text-gray-200">
                      {user.role}
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <Link className="px-4 py-3.5" href={"/home"}>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold">SMS</h1>
                </div>
              </Link>
            )}
          </div>
          <Menus />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
