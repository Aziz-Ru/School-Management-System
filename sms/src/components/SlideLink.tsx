"use client";

import Link from "next/link";
import { IconType } from "react-icons";

const SlideLink = ({
  item,
}: {
  item: { href: string; label: string; icon: IconType };
}) => {
  return (
    <Link
      className="text-lg flex justify-center items-center lg:justify-start gap-2 py-2 md:px-2 rounded-md hover:site-hover "
      href={item.href}
    >
      <item.icon className="h-5 w-5" />
      <span className="hidden lg:block">{item.label}</span>
    </Link>
  );
};

export default SlideLink;
