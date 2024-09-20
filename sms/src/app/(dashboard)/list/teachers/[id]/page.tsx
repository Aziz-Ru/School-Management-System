import prisma from "@/lib/db";
import Image from "next/image";

const page = async ({ params }: { params: { id: string } }) => {
  const employee = await prisma.employee.findUnique({
    where: { id: params.id },
  });
  return (
    <section className="max-w-screen-xl mx-auto">
      <div className="my-2">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-2">
            {employee?.imageURL ? (
              <Image
                className="rounded-full"
                src={employee.imageURL}
                width={100}
                height={100}
                alt="no avatar"
              />
            ) : (
              <Image
                className="rounded-full"
                src={"/image/noavatar.png"}
                width={100}
                height={100}
                alt="no avatar"
              />
            )}
          </div>
          <div>
            <h2 className="text-xl font-medium site-txt">
              {employee?.firstName} {employee?.lastName}
            </h2>
          </div>
        </div>
        <div className="">
          <h1 className="text-center text-2xl font-medium mb-4">
            {employee?.email} {employee?.lastName}
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>
                <span className="font-semibold">Employee ID: </span>
                {employee?.employeeId}
              </p>
              <p>
                <span className="font-semibold">Department: </span>
              </p>
              <p>
                <span className="font-semibold">Email: </span>
                {employee?.email}
              </p>
              <p>
                <span className="font-semibold">Phone: </span>
                {employee?.phone}
              </p>

              <p>
                <span className="font-semibold">Address: </span>
              </p>
              <p>
                <span className="font-semibold">City: </span>
              </p>
              <p>
                <span className="font-semibold">State: </span>
              </p>
              <p>
                <span className="font-semibold">Zip: </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
