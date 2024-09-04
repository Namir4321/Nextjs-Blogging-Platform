import { LuUser2 } from "react-icons/lu";
import { getProfileImage } from "@/utils/action";
import Image from "next/image";
const NavUserIcon = async () => {
  const profile = await getProfileImage();
  return (
    <div>
      <Image
        src={profile.profileImage}
        alt={profile.firstName}
        width={50}
        height={50}
        className="h-8 w-8 rounded-full"
      />
    </div>
  );
};

export default NavUserIcon;
