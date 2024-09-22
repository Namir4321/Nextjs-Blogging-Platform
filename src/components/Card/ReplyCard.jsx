import { fetchCommentReply } from "@/utils/action";
import { formatDate } from "@/utils/format";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import Image from "next/image";
import { Button } from "../ui/button";
const ReplyCard = async ({ comment }) => {
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
          <p className="min-w-fit">{formatDate(comment.updatedAt)}</p>
        </div>
        <p className="font-sans text-xl ml-3">{comment.comment}</p>
      </div>
    </div>
  );
};

export default ReplyCard;
