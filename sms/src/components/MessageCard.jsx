import Image from "next/image";
import Link from "next/link";
const MessageCard = ({ title, msg, path, imgLink }) => {
  return (
    <div className="w-full shadow-md border border-gray-400 px-4 py-4 my-2 rounded-md">
      <div className="bg-indigo-900 text-white px-2 py-2 font-semibold text-xl">
        {title}
      </div>
      <div className="flex py-2 justify-center items-center gap-4">
        <div className="border-2 w-52 ">
          <Image src={imgLink} alt="person" width={100} height={100} />
        </div>
        <div className="relative py-2">
          <div>{msg}</div>
          <div className="absolute right-0 my-1">
            <Link href={path} className="linkIcon right-0">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
