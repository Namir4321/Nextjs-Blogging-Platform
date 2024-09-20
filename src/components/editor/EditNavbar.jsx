import { ButtonProp } from "@/components/form/ButtonProp";
import Navlogo from "@/components/Navbar/NavLogo";
import EditButton from "@/components/editor/EditButton";
import Preview from "@/components/preview/Preview";
import Link from "next/link";
import PreviewPage from "@/app/preview/page";


const EditNavbar = ({blog}) => {
  return (
    <nav className="border-b ">
      <div className="container flex justify-between">
        <div className=" flex flex-row gap-4 py-4 ">
          <Navlogo />
        </div>
        <div className="flex gap-4 items-center">
         
           <Preview blog={blog}/>
         
        </div>
      </div>
    </nav>
  );
};

export default EditNavbar;
