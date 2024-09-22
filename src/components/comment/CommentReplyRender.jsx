import { fetchComment, fetchCommentReply } from "@/utils/action";
import CommentCard from "@/components/Card/CommentCard";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import ReplyCard from "@/components/Card/ReplyCard"
const CommentReplyRender = ({commentId}) => {
    const [comments, setComments] = useState([]);
    const [take, setTake] = useState(5);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
     const handleMoreComment = () => {
       setSkip(skip + 5);
       setTake(take + 5);
     };
         useEffect(() => {
           const fetchComments = async () => {
             setLoading(true);
             try {
               const newComments = await fetchCommentReply(commentId);
               setComments((prevComments) => [...prevComments, ...newComments]);
             } catch (err) {
               console.error(err);
             } finally {
               setLoading(false);
             }
           };

           fetchComments();
         }, []); 

          if (!comments.length) {
            return <div className="mt-5">No comments</div>;
          }
 return (
   <div className="mt-3 max-h-[300px] overflow-y-auto no-scrollbar">
     {comments.map((comment) => (
      console.log(comment)
      //  <ReplyCard key={comment.id} comment={comment} />
       
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
