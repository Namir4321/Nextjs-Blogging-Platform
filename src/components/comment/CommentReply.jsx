import { useState } from "react";
import { Button } from "@/components/ui/button";
import TextAreaInput from "@/components/form/TextAreaInput";
import FormContainer from "@/components/form/FormContainer";
import { postCommentReply, postDeleteReply } from "@/utils/action";
import { ButtonProp } from "@/components/form/ButtonProp";
import { FaRegCommentDots } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
const CommentReply = ({ comment, setISshow,setRefresh }) => {
  const [show, setShow] = useState(false);
  const handleDeleteComment = async (Id, blogId) => {
    try {
      const main = "main comment";
      const deletereply = await postDeleteReply(Id, blogId, main);

      setRefresh((prevState) => !prevState);
    } catch (err) {
      console.error("Failed to delete reply:", err);
    }
  };

  return (
    <div className="">
      <div className="flex  justify-between">
        <div>
          <Button
            type="button"
            variant="ghost"
            className="text-muted-foreground"
            onClick={() => setISshow((prevState) => !prevState)}
          >
            <FaRegCommentDots className="mr-1" /> {comment.children.length}{" "}
            Reply
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="underline"
            onClick={() => setShow((prevState) => !prevState)}
          >
            Reply
          </Button>
        </div>
        <div className="">
          <Button
            variant="ghost"
            className=" text-red-500 "
            onClick={() => handleDeleteComment(comment.id, comment.blogId)}
          >
            <MdOutlineDelete className="text-xl" />
          </Button>
        </div>
      </div>

      {show && (
        <div>
          <FormContainer action={postCommentReply}>
            <TextAreaInput row="2" name="comment" labelText=" " />
            <input type="hidden" name="blogId" value={comment.blogId} />
            <input type="hidden" name="replyingto" value="true" />
            <input type="hidden" name="parentId" value={comment.id} />
            <ButtonProp
              type="submit"
              variant="default"
              text="comment"
              size="lg"
              className="mt-2"
            />
          </FormContainer>
        </div>
      )}
    </div>
  );
};

export default CommentReply;
