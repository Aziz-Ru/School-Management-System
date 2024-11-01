import Icon from "@/components/LucidIcon";
import Image from "next/image";

interface Student {
  id: number;
  fullName: string;
  phone: string;
  img: string | null;
  email: string;
}


const ProfileCard = ({ teacher }: { teacher: Student }) => {
  return (
    <div className="bg-sky-50  py-6 px-4 rounded-md flex-1 flex gap-4 border border-gray-200">
      <div className="w-1/3">
        {teacher.img ? (
          <Image
            className="rounded-full w-36 h-36 object-cover"
            src={teacher.img}
            width={144}
            height={144}
            alt="Avatar"
          />
        ) : (
          <Image
            className="rounded-full w-36 h-36 object-cover"
            src={"/image/noavatar.png"}
            width={144}
            height={144}
            alt="Avatar"
          />
        )}
      </div>
      <div className="w-2/3 flex flex-col gap-2">
        <div className="font-semibold site-txt ">
          <span className="text-xl">Name:</span>
          <span>{teacher.fullName}</span>
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap text-xs  font-medium">
          <div className="w-full md:w-1/3 flex items-center gap-2">
            <Icon name="IdCard" size={18} />
            <span className="site-txt flex gap-2">
              <span className="font-bold">Id:</span>
              <span>{teacher.id}</span>
            </span>
          </div>
          <div className="w-full md:w-1/3 flex items-center gap-2">
            <Icon name="Mail" size={18} />
            <span className="site-txt flex flex-wrap gap-2">
              <span className="font-bold">Mail:</span>

              <span>{teacher.email}</span>
            </span>
          </div>
          <div className="w-full md:w-1/3 flex items-center gap-2">
            <Icon name="Phone" size={18} />
            <span className="site-txt flex gap-2">
              <span className="font-bold">Phone:</span>
              <span>{teacher.phone}</span>
            </span>
          </div>
          {/* <div className="w-full md:w-1/3 flex items-center gap-2">
            <Icon name="Calendar" size={18} />
            <span className="site-txt flex gap-2">
              <span className="font-bold">DOB:</span>
              <span>{}</span>
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
