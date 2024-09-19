import { Button } from "../ui/button";
import { FaRegHeart, FaRegCommentAlt, FaRegCommentDots } from "react-icons/fa";
import ShareButton from "@/components/BlogView/ShareButton";
import Link from "next/link";
import { getAuthUser } from "@/utils/action";

const BlogInteraction = async ({ blog }) => {
  const userId = await getAuthUser();
  return (
    <>
      <hr className="border-gray-200 my-2" />
      <div className="flex justify-between gap-6">
        <div className="flex">
          <div className="flex gap-3 items-center">
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="p-2 cursor-pointer"
            >
              <FaRegHeart />
            </Button>
            <span>{blog.like_count}</span>
          </div>
          <div className="flex gap-3 items-center">
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="p-2 cursor-pointer"
            >
              <FaRegCommentDots />
            </Button>
            <span>{blog.comment_count}</span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          {userId === blog.profile.id && (
            <p className="underline">
              <Link href={`/editor/edit/${blog.title}`}>Edit</Link>
            </p>
          )}
          <ShareButton name={blog.title} propertyId={blog.id} />
        </div>
      </div>
    </>
  );
};

export default BlogInteraction;
