import {ButtonProp} from "@/components/form/ButtonProp";
import Navlogo from "@/components/Navbar/NavLogo";
import NavSearch from "@/components/Navbar/NavSearch";
import NavAuth from "@/components/Navbar/NavAuth";
import DarkMode from "@/components/Navbar/DarkMode";
const Navbar = () => {
  return (
    <nav className="border-b sticky">
      <div className="container flex justify-between">
        <div className=" flex flex-row gap-4 py-4 ">
          <Navlogo />
          <NavSearch placeholder="Search" className="hidden sm:block" />
        </div>
        <div className="flex gap-4 items-center">
          <NavSearch className="sm:hidden" />
          <DarkMode />
          <NavAuth />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
