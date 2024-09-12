import Image from "next/image";
import Link from "next/link";
import Menus from "./Menus";

const Navbar = () => {
  return (
    <header className="top-0 left-0 w-full fixed z-50 border-b shadow">
      <nav className="site-bg site-txt">
        <div className="max-w-screen-xl mx-auto  flex flex-wrap items-center justify-between">
          <Link className="px-4 py-3.5" href={"/"}>
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
