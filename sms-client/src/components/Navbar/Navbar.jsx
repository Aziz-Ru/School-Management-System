import Image from "next/image";
import Link from "next/link";
import Menus from "./Menus";

const Navbar = () => {
  return (
    <header className=" w-full sticky z-50 border-b shadow">
      <nav className="site-bg">
        <div className="max-w-screen-xl mx-auto py-3.5 flex flex-wrap items-center justify-between">
          <Link className="px-4" href={"/"}>
            <div className="flex items-center gap-2">
              <Image
                src={"/image/logo.png"}
                height={30}
                width={30}
                alt="schoolLogo"
              />
              <h1 className="text-2xl font-extrabold">NHSH</h1>
            </div>
          </Link>
          <Menus />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
