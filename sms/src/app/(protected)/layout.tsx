import AdminNavbar from "@/components/Navbar/AdminNavbar";
import Menu from "@/components/slidebar/AdminSideBar";
import { SCHOOL_SHORTNAME } from "@/lib/data";
import { decrypt } from "@/session";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const session = cookieStore.get("__session");
  const { user } = await decrypt(session!.value);
  if (session === undefined || user == null || user == undefined) {
    redirect("/home");
  }

  return (
    <section className="h-screen flex">
      {/* Left */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] site-bg shadow p-4 border-r ">
        <Link
          href={"/"}
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src={"/image/logo.png"} width={32} height={32} alt="logo" />
          <span className="hidden lg:block">{SCHOOL_SHORTNAME}</span>
        </Link>
        <Menu role={user.role} />
      </div>
      {/* Right */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] site-bg overflow-scroll">
        <AdminNavbar user={user} />
        {children}
      </div>
    </section>
  );
}