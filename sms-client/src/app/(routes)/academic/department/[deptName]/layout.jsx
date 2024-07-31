import Link from "next/link";
import department from "./dept.json";
const layout = ({ children }) => {
  return (
    <section className="grid grid-cols-12">
      <aside className="col-span-2">
        <ul>
          {department.map((dept, ind1) => {
            return (
              <li key={dept.id} className="border py-2 px-4">
                <Link href={dept.path}>
                  <div>{dept.name}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
      <aside className="col-span-10">{children}</aside>
    </section>
  );
};

export default layout;
