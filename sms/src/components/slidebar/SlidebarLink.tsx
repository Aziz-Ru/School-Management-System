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
  const mainPath = pathName.split("?")[0].split("/")[2];
  const baseHref = href.split("/")[2];
  const isMatch = mainPath === baseHref;
  const style = isMatch ? "bg-blue-800 text-white" : "";

  return (
    <Link
      key={label}
      className={`text-lg my-0.5 text-black flex justify-center items-center lg:justify-start gap-2 py-2 md:px-2 rounded-md hover:bg-blue-600 hover:text-white ${style}`}
      href={href}
    >
      <div className="">
        <Icon
          name={icon}
          size={18}
          className={isMatch ? "text-white" : "text-black hover:text-white"}
        />
      </div>
      <span className="hidden lg:block">{label}</span>
    </Link>
  );
};

export default SlideBarLink;
