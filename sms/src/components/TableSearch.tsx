"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Icon from "./LucidIcon";
import { Button } from "./ui/button";

const TableSearch = ({ name }: { name: string }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathName = usePathname();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search) {
      router.push(`${pathName}?q=${search}`);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-auto flex items-center gap-2 rounded-md px-2"
      >
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          required={true}
          placeholder={`Search ${name}`}
          className="border px-4 py-2 border-gray-400 text-gray-600 rounded-md bg-transparent text-sm outline-none  focus:ring-blue-500 focus:border-blue-500"
        />
        <Button
          type="submit"
          className="bg-blue-800 hover:bg-blue-700 text-white"
        >
          <Icon name="Search" size={18} color="#FFFFFF" />
          Search
        </Button>
      </form>
    </div>
  );
};

export default TableSearch;
