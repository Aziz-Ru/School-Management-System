import AdminNavbar from "@/components/AdminNavbar";
import Menu from "@/components/slidebar/SideBarMenu";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen flex">
      {/* Left */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] site-bg shadow border-r site-border p-4">
        <Link
          href={"/"}
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src={"/image/logo.png"} width={32} height={32} alt="logo" />
          <span className="hidden lg:block">NGSH</span>
        </Link>
        <Menu />
      </div>
      {/* Right */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] site-bg overflow-scroll">
        <AdminNavbar />
        {children}
      </div>
    </section>
  );
}
