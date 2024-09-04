"use client";
import { handleLogout } from "@/lib/Authaction";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { getProfileImage } from "@/utils/action";
const NavSignOut = () => {
  const { toast } = useToast();
  const handleLogoutRoute = async () => {
    await handleLogout();
    toast({ description: "You have been signed out" });
  };
  return (
    <div>
      <button className="mx-1"onClick={handleLogoutRoute}>
        Logout
      </button>
    </div>
  );
};

export default NavSignOut;
