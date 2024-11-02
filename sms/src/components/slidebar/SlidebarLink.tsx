"use client";
import * as Icons from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../LucidIcon";

const SlideBarLink = ({
  label,
  href,
  icon,
}: {
  icon: keyof typeof Icons;
  label: string;
  href: string;
}) => {
  const pathName = usePathname();
  const baseHref = href.split("?")[0];
  const style = pathName === baseHref ? "bg-blue-100 text-black" : "";

  return (
    <Link
      key={label}
      className={`text-lg text-black flex justify-center items-center lg:justify-start gap-2 py-2 md:px-2 rounded-md hover:site-hover ${style}`}
      href={href}
    >
      <Icon name={icon} size={18} />
      <span className="hidden lg:block">{label}</span>
    </Link>
  );
};

export default SlideBarLink;
