import { Input } from "@/components/ui/input";
import { IoIosSearch } from "react-icons/io";

const NavSearch = ({ placeholder,className}) => {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder={placeholder}
        className={`rounded-full bg-slate-200 h-8 w-8 sm:h-10 sm:w-52 sm:pl-8 outline-none border-none ${className}`}
      />
      <IoIosSearch
        className={`absolute top-2 right-2 h-4 w-4 sm:top-3 sm:left-3 sm:h-5 sm:w-5 ${className}`}
      />
    </div>
  );
};

export default NavSearch;


