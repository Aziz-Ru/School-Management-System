import Link from "next/link";

interface Props {
  path: string;
  title: string;
  isLast: boolean;
}

const NavLink = ({ path, title, isLast }: Props) => {
  return (
    <li
      className={`hover:bg-gray-200 dark:hover:bg-gray-700 border-b border-gray-400 dark:border-gray-600 ${
        isLast && "lg:border-none"
      }`}
    >
      <Link href={path}>
        <div className="px-4 py-3">{title}</div>
      </Link>
    </li>
  );
};

export default NavLink;
