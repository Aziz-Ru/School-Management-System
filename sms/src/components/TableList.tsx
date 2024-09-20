import { teacherData } from "@/lib/data";
import Image from "next/image";

const TableList = () => {
  return (
    <table className="mt-4 w-full">
      <thead>
        <th>info</th>
        <th>Teacher Id</th>
      </thead>
      <tbody></tbody>
      <div>
        {teacherData.map((teacher, index) => {
          return (
            <div key={index} className="flex justify-between items-center">
              <div className="">
                <Image
                  src={teacher.photo}
                  width={50}
                  height={50}
                  alt="Profile-pic"
                  className="rounded-full w-10 h-10 md:hidden xl:block"
                />
              </div>
              <div className="">{teacher.name}</div>
            </div>
          );
        })}
      </div>
    </table>
  );
};

export default TableList;
