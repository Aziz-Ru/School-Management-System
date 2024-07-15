import Link from "next/link";

const NoticeCard = ({ title, path, createdAt }) => {
  return (
    <div className=" shadow-lg text-center px-4 py-2 my-1 rounded-md">
      <Link href={path} className="font-bold">
        {title}
      </Link>
      <p className="text-red-500 font-semibold">{createdAt}</p>
    </div>
  );
};

export default NoticeCard;
