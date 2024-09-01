import prisma from "@/lib/db";
import Image from "next/image";

const Hero = async () => {
  const school = await prisma.school.findFirst();

  return (
    <div className="site-bg">
      <div className="max-w-screen-xl mx-auto grid grid-cols-3">
        <div className="col-span-3 md:col-span-1 flex items-center justify-center">
          <Image
            className=""
            src={"/image/logo.png"}
            width={150}
            height={150}
          />
        </div>
        <div className="col-span-3 md:col-span-2">
          <div className="flex items-center justify-center flex-col h-full">
            <div className=" text-center">
              <h1 className="site-txt text-5xl font-extrabold flex items-center justify-center">
                {school.name}
              </h1>
            </div>
            <div className="flex flex-col gap-4 lg:gap-6 items-center py-4">
              <div className="site-txt dark:text-white font-semibold flex gap-2 lg:gap-6">
                {school.message}
              </div>
              <div className="site-txt text-xl font-semibold flex gap-2">
                <span>School Code:{school.schoolCode}</span>
                <span>|</span>
                <span>EIIN: {school.EIIN}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
