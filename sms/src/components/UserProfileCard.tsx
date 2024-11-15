import Icon from "@/components/LucidIcon";
import { User } from "@/lib/types";
import Image from "next/image";

const UserProfileCard = ({ user }: { user: User }) => {
  return (
    <div className="bg-sky-50  py-6 px-4 rounded-md flex-1 flex gap-4 border border-gray-200">
      <div className="w-1/3">
        {user.img! ? (
          <Image
            className="rounded-full w-36 h-36 object-cover"
            src={user.img}
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
      <div className="w-2/3 flex flex-col gap-2 text-gray-800">
        <div className="font-semibold site-txt ">
          <span className="text-md">Name: </span>
          {user.teacherProfile ? (
            <span>{`${user.teacherProfile?.first_name} ${user.teacherProfile?.last_name}`}</span>
          ) : user.studentProfile ? (
            <span>{`${user.studentProfile?.first_name} ${user.studentProfile?.last_name}`}</span>
          ) : (
            <span>{user.email}</span>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap text-xs  font-medium">
          <div className="w-full md:w-1/3 flex items-center gap-2">
            <Icon name="IdCard" size={18} />
            <span className="site-txt flex gap-2">
              <span className="font-bold">Id:</span>
              <span>{user.id}</span>
            </span>
          </div>
          <div className="w-full md:w-1/3 flex items-center gap-2">
            <Icon name="Mail" size={18} />
            <span className="site-txt flex flex-wrap gap-2">
              <span className="font-bold">Mail:</span>

              <span>{user.email}</span>
            </span>
          </div>
          <div className="w-full md:w-1/3 flex items-center gap-2">
            <Icon name="MapPinHouse" size={18} />
            <span className="site-txt flex gap-2">
              <span className="font-bold">Address:</span>
              <span>{user.address}</span>
            </span>
          </div>
          <div className="w-full md:w-1/3 flex items-center gap-2">
            <Icon name="Phone" size={18} />
            <span className="site-txt flex gap-2">
              <span className="font-bold">Phone:</span>
              <span>{user.phone}</span>
            </span>
          </div>
          {user.teacherProfile && (
            <>
              <div className="w-full md:w-1/3 flex items-center gap-2">
                <Icon name="BookA" size={18} />
                <span className="site-txt flex gap-2">
                  <span className="font-bold">Enrolled:</span>
                  <span>{user.teacherProfile.subject_name}</span>
                </span>
              </div>
              <div className="w-full md:w-1/3 flex items-center gap-2">
                <Icon name="BookA" size={18} />
                <span className="site-txt flex gap-2">
                  <span className="font-bold">Degree:</span>
                  <span>{user.teacherProfile.degrees}</span>
                </span>
              </div>

              <div className="w-full md:w-1/3 flex items-center gap-2">
                <Icon name="ShieldHalf" size={18} />
                <span className="site-txt flex gap-2">
                  <span className="font-bold">Rank:</span>
                  <span>{user.teacherProfile.rank}</span>
                </span>
              </div>
              <div className="w-full md:w-1/3 flex items-center gap-2">
                <Icon name="ShieldHalf" size={18} />
                <span className="site-txt flex gap-2">
                  <span className="font-bold">Salary:</span>
                  <span>{user.teacherProfile.salary}</span>
                </span>
              </div>
            </>
          )}
          {user.studentProfile && (
            <>
              <div className="w-full md:w-1/3 flex items-center gap-2">
                <Icon name="BookA" size={18} />
                <span className="site-txt flex gap-2">
                  <span className="font-bold">Enrolled:</span>
                  <span>{user.studentProfile.section?.class_id}</span>
                </span>
              </div>
              <div className="w-full md:w-1/3 flex items-center gap-2">
                <Icon name="BookA" size={18} />
                <span className="site-txt flex gap-2">
                  <span className="font-bold">Degree:</span>
                  <span>
                    {new Date(user.studentProfile.dob!).toLocaleDateString()}
                  </span>
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
