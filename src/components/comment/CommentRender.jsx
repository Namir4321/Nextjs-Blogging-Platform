"use client";

import { fetchComment } from "@/utils/action";
import CommentCard from "@/components/Card/CommentCard";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const CommentRender = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [take, setTake] = useState(5);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const handleMoreComment = () => {
    setSkip(skip + 5);
    setTake(take + 5);
  };

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const newComments = await fetchComment(blogId, take, skip);
        if (refresh || skip === 0) {
          setComments(newComments);
        } else {
          setComments((prevComments) => [
            ...prevComments,
            ...newComments,
          ]); 
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [blogId, take, skip,refresh]);

  if (!comments.length) {
    return <div className="mt-5">No comments</div>;
  }
  return (
    <div
      className="mt-3 max-h-[300px] overflow-y-auto no-scrollbar"
      key={comment.id}
    >
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          setRefresh={setRefresh}
        />
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

export default CommentRender;
