import { HiSearch } from "react-icons/hi";

const TableSearch = () => {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 border site-border rounded-md px-2">
      <HiSearch />
      <input
        className=" outline-none site-bg w-full p-2 "
        type="text"
        name="Search"
        placeholder="Search..."
      />
    </div>
  );
};

export default TableSearch;
