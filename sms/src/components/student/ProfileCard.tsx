import Icon from "@/components/LucidIcon";
import { Student } from "@/lib/types";

const ProfileCard = ({ student }: { student: Student }) => {
  return (
    <div className="bg-sky-50  py-6 px-4 rounded-md flex-1 flex gap-4 border border-gray-200">
      <div className="w-1/3"></div>
      <div className="w-2/3 flex flex-col gap-2">
        <div className="font-semibold site-txt ">
          <span className="text-xl">Name:</span>
          <span>{student.first_name}</span>
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap text-xs  font-medium">
          <div className="w-full md:w-1/3 flex items-center gap-2">
            <Icon name="IdCard" size={18} />
            <span className="site-txt flex gap-2">
              <span className="font-bold">Id:</span>
              <span>{student.student_id}</span>
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
              <span>{student.last_name}</span>
            </span>
          </div>
          <div className="w-full md:w-1/3 flex items-center gap-2">
            <Icon name="Calendar" size={18} />
            <span className="site-txt flex gap-2">
              <span className="font-bold">DOB:</span>
              {/* <span>{student.dob!.toDateString()}</span> */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
