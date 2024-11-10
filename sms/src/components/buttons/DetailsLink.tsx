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
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow h-9 px-4 py-2 bg-blue-600 hover:bg-blue-500"
      href={href}
    >
      {title}
    </Link>
  );
};

export default DetailsLink;
