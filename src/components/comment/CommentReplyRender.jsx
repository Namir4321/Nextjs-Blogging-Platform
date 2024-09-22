import { fetchCommentReply, postDeleteReply } from "@/utils/action";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import ReplyCard from "@/components/Card/ReplyCard";
import { formatDate } from "@/utils/format";
import Image from "next/image";
import { MdOutlineDelete } from "react-icons/md";

const CommentReplyRender = ({ commentId }) => {
  const [replycomments, setIsReplyingComment] = useState([]);
  const [take, setTake] = useState(5);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleMoreComment = () => {
    setSkip(skip + 5);
    setTake(take + 5);
  };
  const handleDeleteComment = async (id,blogId) => {
    const main="reply comment"
    const deletereply = await postDeleteReply(id,blogId,main);
  };
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const newComments = await fetchCommentReply(commentId, take, skip);
        setIsReplyingComment((prevComments) => [
          ...prevComments,
          ...newComments,
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [take,skip,commentId]);

  if (!replycomments.length) {
    return <div className="mt-5">No reply comments</div>;
  }
  return (
    <div className="mt-3 max-h-[300px] overflow-y-auto no-scrollbar">
      {replycomments.map((comment) => (
        <>
          <div className="w-full">
            <div className="my-7 p-6 rounded-md border-gray-100">
              <div className="flex gap-3 items-center mb-8" key={comment.id}>
                <Image
                  src={comment.profile.profileImage}
                  className="w-6 h-6 rounded-full"
                  width={50}
                  height={50}
                  alt="profile"
                />
                <p className="line-clamp-1">
                  {comment.profile.firstName}
                  {comment.profile.username}
                </p>
                <p className="min-w-fit">{formatDate(comment.updatedAt)}</p>
                <Button
                  variant="ghost"
                  className=" text-red-600"
                  onClick={() => handleDeleteComment(comment.id,comment.blogId)}
                >
                  <MdOutlineDelete className="text-xl" />
                </Button>
              </div>
              <p className="font-sans text-xl ml-3">{comment.comment}</p>
            </div>
          </div>
        </>
      ))}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Button variant="outline" onClick={handleMoreComment}>
          Load More
        </Button>
      )}
    </div>
  );
};

export default CommentReplyRender;
