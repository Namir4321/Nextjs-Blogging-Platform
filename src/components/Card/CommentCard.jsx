import { formatDate } from "@/utils/format";
import Image from "next/image";
import ReplyCard from "@/components/Card/ReplyCard";
import CommentReply from "@/components/comment/CommentReply";
import CommentReplyRender from "@/components/comment/CommentReplyRender";
import { useState } from "react";
const CommentCard = ({ comment ,setRefresh}) => {
  const [show, setISshow] = useState(false);
  const [numreply,setNumReply]=useState()
  return (
    <div className="w-full">
      <div className="my-5 p-6 rounded-md border-gray-100">
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
          <p className="min-w-fit">{formatDate(comment.profile.createdAt)}</p>
        </div>
        <p className="font-sans text-xl ml-3">{comment.comment}</p>
        <CommentReply
          numreply={numreply}
          comment={comment}
          key={comment.id}
          setISshow={setISshow}
          setRefresh={setRefresh}
        />
        {show && <CommentReplyRender commentId={comment.id} setNumReply={setNumReply}/>}
      </div>
    </div>
  );
};

export default CommentCard;
