import { profile } from "console";
import Image from "next/image";
import Link from "next/link";
import {formatDate} from "@/utils/format";

const UserInfo = ({profile,published}) => {
  return (
    <div className="flex max-sm:flex-col  justify-between  my-8 items-start">
      <div className="flex gap-5 items-start ">
        <Image
          src={profile?.profileImage}
          alt={profile?.firstName}
          width={50}
          height={50}
          className="h-12 w-12 rounded-full"
        />
        <p className="capitalize text-black">
          {profile.firstName} {profile.lastName}
          <br />
          <Link href={`/profile/${profile.username}`} className="underline">
            {profile.username}
          </Link>
        </p>
      </div>
        <p className="text-gray-900 opacity-75 max-sm:mt-6 ">
          Published on {formatDate(published)}
        </p>
    </div>
  );
};

export default UserInfo;
