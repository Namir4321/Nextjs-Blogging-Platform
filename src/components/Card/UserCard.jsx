import Image from "next/image";
import Link from "next/link";

const UserCard = ({ user }) => {
  const { firstName, lastName, profileImage, username } = user;
  return (
    <div>
      <Link href={`/profile/${username}`} className="">
        <div className="flex gap-5 items-center mb-5">
          <Image
            src={profileImage}
            width={40}
            height={40}
            alt={`${firstName} ${lastName}`}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h1 className="font-medium text-xl line-clamp-2">
              {firstName} {lastName}
            </h1>
            <p className="text-dark-gre">{username}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UserCard;
