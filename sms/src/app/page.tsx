import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import Link from "next/link";

import BigCalendar from "@/components/BigCalendar";
import ShadcnAlertDialog from "@/components/shadcn/AlertDialog";
import ImageAvatar from "@/components/shadcn/ImageAvatar";
import ShCalendar from "@/components/shadcn/ShCalendar";
import { DialogDemo } from "@/components/shadcn/ShDialog";

const GeneralPage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const classes = await prisma.class.findMany({
    skip: (page - 1) * 2,
    take: 2,
  });
  const hasNextpage = (await prisma.class.count()) > page * 2;

  return (
    <div>
      <div className="">
        {classes.map((cls) => {
          return <div key={cls.id}>{cls.className}</div>;
        })}
      </div>
      <div className="">
        <Link href={`?page=${page - 1}`} passHref>
          <button disabled={page == 1}>Previous</button>
        </Link>

        <Link href={`?page=${page + 1}`} passHref>
          <button disabled={!hasNextpage}>Next</button>
        </Link>
      </div>

      <div className="">
        <h1>Shadcn</h1>

        <div className="flex">
          <span>Button:</span>
          <Button>Click me</Button>
          <ImageAvatar />
        </div>
        <div className="">
          <ShCalendar />
          <ShadcnAlertDialog />
          <DialogDemo />
        </div>
      </div>
      <div className="p-4">
        <BigCalendar />
      </div>
    </div>
  );
};

export default GeneralPage;
