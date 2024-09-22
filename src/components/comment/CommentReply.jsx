import { useState } from "react";
import { Button } from "@/components/ui/button";
import TextAreaInput from "@/components/form/TextAreaInput";
import FormContainer from "@/components/form/FormContainer";
import { postCommentReply } from "@/utils/action";
import { ButtonProp } from "@/components/form/ButtonProp";

const CommentReply = ({comment}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="">
      <Button
        variant="ghost"
        className=" underline"
        onClick={() => setShow((prevState) => !prevState)}
      >
        Reply
      </Button>
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
