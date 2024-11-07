"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({ path, name }: { path: string; name: string }) => {
  const pathName = usePathname();

  const isActive = pathName === path;

  return (
    <div>
      <Link
        href={path}
        className={`${isActive ? "bg-blue-100" : ""} px-4 py-2 rounded`}
      >
        {name}
      </Link>
    </div>
  );
};

export default ActiveLink;
