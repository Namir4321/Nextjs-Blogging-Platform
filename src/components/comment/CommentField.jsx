import TextAreaInput from "@/components/form/TextAreaInput";
import { ButtonProp } from "../form/ButtonProp";
import FormContainer from "../form/FormContainer";
import { AddCommentAction } from "@/utils/action";
const CommentField = ({ blog }) => {
  return (
    <>
      <FormContainer action={AddCommentAction}>
        <TextAreaInput
          name="comment"
          row={3}
          placeholder="Leave a comment..."
          className="bg-gray-50 mb-2"
        />
        <input type="hidden" name="blogId" value={blog.id} />
        <input type="hidden" name="replyingto" value="false" />
        <ButtonProp
          type="submit"
          variant="default"
          text="comment"
          size="lg"
          className="mt-2"
        />
      </FormContainer>
    </>
  );
};

export default CommentField;
