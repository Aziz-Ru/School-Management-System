import Icon from "@/components/LucidIcon";
import { Student } from "../../../../utils/types";

import Image from "next/image";

const StudentProfileCard = ({ student }: { student: Student }) => {
  return (
    <div className="bg-sky-50  py-6 px-4 rounded-md flex-1 flex gap-4 border border-gray-200">
      <div className="w-1/3">
        {student.img ? (
          <Image
            className="rounded-full w-36 h-36 object-cover"
            src={student.img}
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
          <span>{student.fullName}</span>
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap text-xs  font-medium">
          <div className="w-full md:w-1/3 flex items-center gap-2">
            <Icon name="IdCard" size={18} />
            <span className="site-txt flex gap-2">
              <span className="font-bold">Id:</span>
              <span>{student.id}</span>
            </span>
          </div>
          <div className="w-full md:w-1/3 flex items-center gap-2">
            <Icon name="Section" size={18} />
            <span className="site-txt flex gap-2">
              <span className="font-bold">Section:</span>
              <span>padma</span>
            </span>
          </div>
          <div className="w-full md:w-1/3 flex items-center gap-2">
            <Icon name="Phone" size={18} />
            <span className="site-txt flex gap-2">
              <span className="font-bold">Phone:</span>
              <span>{student.phone}</span>
            </span>
          </div>
          <div className="w-full md:w-1/3 flex items-center gap-2">
            <Icon name="Calendar" size={18} />
            <span className="site-txt flex gap-2">
              <span className="font-bold">DOB:</span>
              {/* <span>{new Date(student.dob).toLocaleDateString()}</span> */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileCard;
