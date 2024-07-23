import Link from "next/link";
import routine from "./routine.json";
export const metadata = {
  title: "Class Routine",
  description: "Class Routine Page",
};
export default function RootLayout({ children }) {
  //   console.log(routine);
  return (
    <>
      <section className="grid sm:grid-cols-12 grid-cols-1 ">
        <ul className="col-span-3 md:col-span-2 2xl:col-span-1">
          {routine.map((level, ind) => {
            return (
              <li
                key={`${ind}`}
                className="border border-black px-4 py-1 text-xl font-serif"
              >
                <Link href={level.path}>
                  <div>{level.name}</div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="col-span-9 my-2 flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Class Routine</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
    </>
  );
}
