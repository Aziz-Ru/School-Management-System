import Link from "next/link";
import Icon from "./LucidIcon";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const TableSearch = () => {
  return (
    <div className="w-full md:w-auto flex items-center gap-2   rounded-md px-2">
      <Input
        className=" outline-none site-bg w-full p-2 "
        type="text"
        name="Search"
        placeholder="Search..."
      />
      <Link href={""}>
        <Button className="bg-sky-400 hover:bg-sky-300 text-white">
          <Icon name="Search" size={18} color="#FFFFFF" />
          Search
        </Button>
      </Link>
    </div>
  );
};

export default TableSearch;
