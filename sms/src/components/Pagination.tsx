import { ITEM_PAR_PAGE } from "@/lib/data";
import Link from "next/link";

const Pagination = ({
  total,
  page,
  link,
}: {
  total: number;
  page: number;
  link: string;
}) => {
  const hasPrev = ITEM_PAR_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PAR_PAGE * (page - 1) + ITEM_PAR_PAGE < total;
  return (
    <div className="p-4 flex items-center gap-6 md:gap-10 justify-center site-txt">
      <Link
        passHref
        href={`${link}?page=${page - 1}`}
        className={`link-btn px-4 py-1 text-lg ${
          !hasPrev ? "bg-blue-400" : ""
        }`}
      >
        <button disabled={!hasPrev}>Previous</button>
      </Link>

      <div className="flex items-center gap-3 border site-border">
        {Array.from(
          { length: Math.ceil(total / ITEM_PAR_PAGE) },
          (_, index) => {
            return (
              <div className="" key={index}>
                <Link
                  className={`${page == index + 1 ? "bg-blue-200" : ""} px-1`}
                  href={`${link}?page=${index + 1}`}
                >
                  {index + 1}
                </Link>
              </div>
            );
          }
        )}
      </div>
      <Link
        passHref
        href={`/list/teachers?page=${page + 1}`}
        className={`link-btn px-4 py-1 text-lg ${
          !hasNext ? "bg-blue-400" : ""
        }`}
      >
        <button disabled={!hasNext}>Next</button>
      </Link>
    </div>
  );
};

export default Pagination;
