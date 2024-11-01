import Link from "next/link";

interface Props {
  path: string;
  title: string;
  isLast: boolean;
}

const NavLink = ({ path, title, isLast }: Props) => {
  return (
    <li
      className={`hover:bg-indigo-500  border-b border-indigo-200 ${
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
