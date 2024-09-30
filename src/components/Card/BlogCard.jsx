import { formatDate } from "@/utils/format";
import { Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";

const BlogCard = ({ blog }) => {
  const { title, banner, description, createdAt, id, Tag,like_count } = blog;
  const { firstName, lastName, profileImage, username } = blog.profile;
  const isLiked = blog.Favourite;
  return (
    <article>
      <Link
        href={`/blog/${id}`}
        className="flex gap-8 items-center border-b border-grey pb-5 mb-4"
      >
        <div className="w-full">
          <div className="flex gap-2 items-center mb-7">
            <Image
              src={profileImage}
              width={100}
              height={100}
              className="rounded-full w-6 h-6"
              alt={firstName}
            />
            <p className="line-clamp-1 text-sm">
              {firstName} {username}
            </p>
            <p className="min-w-fit">{formatDate(createdAt)}</p>
          </div>
          <h3 className="text-xl font-medium leading-7 line-clamp-3 sm:line-clamp-2">
            {title}
          </h3>
          <p className="my-3 text-md font-gelasio leading-7 max-sm:hidden md:max-[1108px]:hidden line-clamp-2">
            {description}
          </p>
          <div className="flex gap-4 mt-7">
            <span className="btn-dark bg-gray-200 dark:bg-muted rounded-xl text-xs text-black dark:text-white py-1 px-4">
              {Tag[0].charAt(0).toUpperCase() + Tag[0].slice(1).toLowerCase()}
            </span>
            <span className="ml-3 flex items-center gap-2 text-gray-500 dark:text-white">
             
              {isLiked&&isLiked.length ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart />
              )}
              {like_count?like_count:""}
            </span>
          </div>
        </div>
        <div className="h-28 aspect-square bg-gray-400">
          <Image
            src={banner}
            alt={title}
            width={500}
            height={500}
            className="w-full aspect-square object-cover"
          />
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
