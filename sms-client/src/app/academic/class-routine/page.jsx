import Link from "next/link";
import routine from "./routine.json";
const page = () => {
  return (
    <main className="my-2">
      <div>
        <h1 className="text-4xl text-green-500 font-bold text-center ">
          Routine For All Class
        </h1>
        <div className="flex justify-center">
          <table className=" table-cell border-black">
            <th>
              <td className="border-2 p-2 font-bold text-lg">Class Name</td>
              <td className="border-2 p-2 font-bold text-lg">Link</td>
            </th>
            {routine.primary.children.map((level, ind) => {
              return (
                <tr className=" " key={level.id}>
                  <td className="border-2 p-2 font-semibold">{level.name}</td>
                  <td className="border-2 p-2">
                    <Link href={level.path}>view</Link>
                  </td>
                </tr>
              );
            })}
            {routine.school.children.map((level, ind) => {
              return (
                <tr className=" " key={level.id}>
                  <td className="border-2 p-2 font-semibold">{level.name}</td>
                  <td className="border-2 p-2">
                    <Link href={level.path}>view</Link>
                  </td>
                </tr>
              );
            })}
            {routine.college.children.map((level, ind) => {
              return (
                <tr className=" " key={level.id}>
                  <td className="border-2 p-2 font-semibold">{level.name}</td>
                  <td className="border-2 p-2">
                    <Link href={level.path}>view</Link>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </main>
  );
};

export default page;
