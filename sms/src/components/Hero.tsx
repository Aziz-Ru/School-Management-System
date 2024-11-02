import {
  SCHOOL_CODE,
  SCHOOL_EIIN,
  SCHOOL_LOGO,
  SCHOOL_MESSAGE,
  SCHOOL_NAME,
} from "@/lib/data";
import Image from "next/image";
import Navbar from "./Navbar/Navbar";

const Hero = () => {
  return (
    <div className="bg-indigo-900 pt-4">
      <div className="max-w-screen-xl flex mx-auto ">
        <div className="flex items-center justify-center">
          <Image alt="School Logo" src={SCHOOL_LOGO} width={100} height={100} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-center flex-col h-full">
            <div className=" text-center">
              <h1 className="text-white text-6xl font-extrabold flex items-center justify-center">
                {SCHOOL_NAME}
              </h1>
            </div>
            <div className="flex flex-col gap-2  lg:gap-4 items-center py-2">
              <div className="text-gray-300 font-semibold flex gap-2 lg:gap-6">
                {SCHOOL_MESSAGE}
              </div>
              <div className="text-white text-xl font-semibold flex gap-2">
                <span>School Code:{SCHOOL_CODE}</span>
                <span>|</span>
                <span>EIIN: {SCHOOL_EIIN}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Hero;
