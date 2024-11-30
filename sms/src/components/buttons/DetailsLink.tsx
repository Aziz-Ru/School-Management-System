import Link from "next/link";

const DetailsLink = ({
  href,
  title = "Details",
}: {
  href: string;
  title?: string;
}) => {
  return (
    <Link
      className="text-blue-600 hover:text-blue-300 underline cursor-pointer tracking-wider"
      href={href}
    >
      {title}
    </Link>
  );
};

export default DetailsLink;
