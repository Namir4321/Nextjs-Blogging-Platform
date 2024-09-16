"use client";
import { Input } from "@/components/ui/input";
import { useSearchParams,useRouter } from "next/navigation";

import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDebouncedCallback } from "use-debounce";

const NavSearch = ({ placeholder, className }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || ""
  );
   const handleSearch = useDebouncedCallback((value) => {
     const params = new URLSearchParams(searchParams);
     if (value) {
       params.set("search", value);
     } else {
       params.delete("search");
     }
     replace(`/?${params.toString()}`);
   }, 500);
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder={placeholder}
        className={`rounded-full bg-slate-200 h-8 w-8 sm:h-10 sm:w-52 sm:pl-8 outline-none border-none ${className}`}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
        value={search}
      />
      <IoIosSearch
        className={`absolute top-2 right-2 h-4 w-4 sm:top-3 sm:left-3 sm:h-5 sm:w-5 ${className}`}
      />
    </div>
  );
};

export default NavSearch;
