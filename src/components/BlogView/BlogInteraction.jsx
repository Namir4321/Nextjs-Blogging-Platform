import { Button } from "../ui/button";
import ShareButton from "@/components/BlogView/ShareButton";
import FavouriteToggleButton from "@/components/Card/FavouriteToggleButton";
import { getAuthUser } from "@/utils/action";
import EditblogButton from "@/components/BlogView/EditblogButton";
import CommentBox from "@/components/BlogView/CommentBox";
const BlogInteraction = async ({ blog }) => {
  const userId = await getAuthUser();
  return (
    <>
      <hr className="border-gray-200 my-2" />
      <div className="flex justify-between gap-6">
        <div className="flex">
          <div className="flex gap-3 items-center">
            <FavouriteToggleButton blogId={blog.id} />
            {blog.like_count > 0 && (
              <span className="mr-1">
                {blog.like_count}
              </span>
            )}
          </div>
          <div className="flex gap-3 items-center">
           
            <CommentBox blog={blog}/>
            <span>{blog.comment_count}</span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          {userId === blog.profile.id && <EditblogButton blog={blog} />}
          <ShareButton name={blog.title} propertyId={blog.id} />
        </div>
      </div>
    </>
  );
};

export default BlogInteraction;
