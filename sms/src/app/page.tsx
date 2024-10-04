import prisma from "@/lib/db";
import Link from "next/link";

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
    </div>
  );
};

export default GeneralPage;
