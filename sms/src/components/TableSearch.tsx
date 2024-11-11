"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const TableSearch = ({ name }: { name: string }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [query] = useDebounce(searchQuery, 500);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    router.replace(`${pathName}?q=${query}`);
  }, [query, router]);

  return (
    <div>
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        required={true}
        placeholder={`Search ${name}`}
        className="border px-4 py-2 border-gray-400 text-gray-600 rounded-md bg-transparent text-sm outline-none  focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default TableSearch;
