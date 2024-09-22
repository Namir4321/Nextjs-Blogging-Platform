import { fetchCommentReply } from "@/utils/action";
import { useEffect,useState } from "react";
import CommentCard from "./CommentCard";
import { Button } from "../ui/button";
const ReplyCard = async ({key,comment}) => {
  console.log(key,comment)
};

export default ReplyCard;
