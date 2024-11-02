import Annoucement from "@/components/Annoucement";
import { SCHOOL_LOGO } from "@/lib/data";
import Image from "next/image";

const page = () => {
  const imageArray = [
    "/image/school0.jpeg",
    "/image/school1.jpeg",
    "/image/school2.jpg",
    "/image/school3.jpg",
  ];

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-12">
        <div className=" col-span-12 md:col-span-7">
          <Image src={SCHOOL_LOGO} width={600} height={600} alt="schoolImage" />
        </div>
        <div className="col-span-12 md:col-span-5">
          <Annoucement />
        </div>
      </div>
    </div>
  );
};

export default page;
