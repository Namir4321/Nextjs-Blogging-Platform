import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuFileSignature } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import NavUserIcon from "@/components/Navbar/NavUserIcon";
import NavSignOut from "./NavSignOut";
import { getProfileImage } from "@/utils/action";
import Link from "next/link";

const NavLink = async () => {
  const profile = await getProfileImage();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <NavUserIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex gap-2">
            <Link href="/editor" className="flex gap-2">
              Write
              <LuFileSignature className="w-4 h-4" />
            </Link>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
          <DropdownMenuItem>Setting</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="grid gap-1">
            <NavSignOut />
            <h6 className="mx-1">{profile?.username}</h6>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default NavLink;
