"use client";
import { formatDate } from "@/utils/format";
import { Button } from "../ui/button";
import NotificationCommentField from "@/components/Notification/NotificationCommentField";
import { useEffect, useState } from "react";
import CommentReplyCard from "@/components/Notification/CommentReplyCard";
import { fetchSingleComment, postDeleteReply } from "@/utils/action";

const ReplyCard = ({ notification, userId }) => {
  const [show, setShow] = useState(false);
  const [isreplying, setIsReplying] = useState();
  const [refresh,setRefresh]=useState(false);
  
  const userReplies =
  isreplying?.children?.filter((item) => item.profile.id === userId) || [];
  
  useEffect(() => {
    const fetch = async () => {
      if (notification.comment) {
        const comment = await fetchSingleComment(notification.comment.id);
        setIsReplying(comment);
      }
    };
    fetch();
  }, [userId,refresh,notification]);

  const toggleShow = () => {
    setShow((prev) => !prev);
  };
  const handleDelete = async (id, blogId, blogAuthor) => {
    console.log(id);
    await postDeleteReply(id, blogId,main="main comment",blogAuthor);
    setRefresh((prev) => !prev);
    //  id, blogId, main, blogAuthor;
  };
  return (
    <>
      <div className="pl-5 mt-3 text-gray-500 flex gap-8 ">
        {notification.type !== "like" ? (
          <>
            <p className="mt-1">
              {formatDate(notification.comment?.createdAt, "year")}
            </p>
            <Button
              variant="icon"
              className="m-0 p-0 underline hover:text-black"
              onClick={()=>{handleDelete(notification.comment.id,notification.blog.id,notification.blog.profileId)}}
            >
              Delete
            </Button>
            {userReplies.length === 0 && (
              <Button
                onClick={toggleShow}
                variant="icon"
                className="m-0 p-0 underline hover:text-black"
              >
                Reply
              </Button>
            )}
          </>
        ) : (
          ""
        )}
      </div>
      {userReplies.length > 0 && (
        <div className="">
          <CommentReplyCard
            notification={isreplying}
            userId={userId}
            setRefresh={setRefresh}
          />
        </div>
      )}
      {show && !userReplies.length > 0 && (
        <div className="mt-8">
          <NotificationCommentField notification={notification} />
        </div>
      )}
    </>
  );
};

export default ReplyCard;
