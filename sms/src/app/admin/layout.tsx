import Link from "next/link";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="max-w-screen-xl mx-auto overflow-y-auto ">
      <div className="">
        <ul className="px-6 py-2 flex gap-2">
          <li>
            <Link href={"/admin/class"}> Class</Link>
          </li>
          <li>
            <Link href={"/admin/course"}> Course</Link>
          </li>
          <li>
            <Link href={"/admin/section"}> Section</Link>
          </li>
          <li>
            <Link href={"/admin/ds"}> Department</Link>
          </li>
          <li>
            <Link href={"/admin/employee"}>Employee</Link>
          </li>
        </ul>
      </div>
      <div className="">{children}</div>
    </section>
  );
};

export default AdminLayout;
