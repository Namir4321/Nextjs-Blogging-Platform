import { formatDate } from "@/utils/format";
import Image from "next/image";
import Link from "next/link";

const TrendCard = ({ blog, index }) => {
  const { title, id, createdAt } = blog;
  const { firstName, lastName, profileImage, username } = blog.profile;
  return (
    <>
      <Link href={`/blog/${id}`} className="flex gap-5 mb-8">
        <h1 className="text-5xl mt-1 sm:text-4xl lg:text-7xl font-bold text-gray-300 leading-none">
          {index < 10 ? "0" + (index + 1) : index}
        </h1>
        <div>
          <div className="flex gap-2 items-center mb-3">
            <Image
              src={profileImage}
              width={100}
              height={100}
              className="rounded-full w-6 h-6"
              alt={firstName}
            />
            <p className="line-clamp-1 text-xs">
              {firstName} {username}
            </p>
            <p className="min-w-fit text-xs">{formatDate(createdAt)}</p>
          </div>
          <h1 className="text-lg font-medium leading-7 line-clamp-3 sm:line-clamp-2">
            {title}
          </h1>
        </div>
      </Link>
    </>
  );
};

export default TrendCard;
