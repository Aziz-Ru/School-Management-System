import prisma from "@/lib/db";
import Image from "next/image";

const Hero = async () => {
  const school = await prisma.school.findFirst();
  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto grid grid-cols-3 py-6 lg:py-10">
        <div className="col-span-3 md:col-span-1 flex items-center justify-center">
          <Image
            className=""
            src={"/image/logo.png"}
            width={150}
            height={150}
          />
        </div>
        <div className="col-span-3 md:col-span-2">
          <div className="flex items-center justify-center flex-col">
            <div className=" text-center">
              <h1 className="text-dark dark:text-white text-5xl font-extrabold flex items-center justify-center">
                {school.name}
              </h1>
            </div>

            <div className="flex flex-col items-center my-3">
              <div className="text-xl text-dark dark:text-white font-semibold flex gap-2">
                {school.message}
              </div>
              <div className="text-black dark:text-white text-xl font-semibold flex gap-2">
                <span>School Code:{school.schoolCode}</span>
                <span>|</span>
                <span>EIIN{school.EIIN}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
