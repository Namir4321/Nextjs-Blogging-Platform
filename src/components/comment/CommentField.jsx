import TextAreaInput from "@/components/form/TextAreaInput";
import { ButtonProp } from "../form/ButtonProp";
import FormContainer from "../form/FormContainer";
import { AddCommentAction, getAuthUser } from "@/utils/action";
const CommentField = async({ blog }) => {
  const user=await getAuthUser();
  if(!user){
    
  }
  return (
    <>
      <FormContainer action={AddCommentAction}>
        <TextAreaInput
          name="comment"
          row={3}
          placeholder="Leave a comment..."
          className="bg-gray-50 dark:bg-muted mb-2"
        />
        <input type="hidden" name="blogId" value={blog.id} />
        <input type="hidden" name="replyingto" value="false" />
        <input type="hidden" name="UserId"value={blog.profile.id}/>
        <ButtonProp
          type="submit"
          variant="default"
          text="comment"
          size="lg"
          className="mt-2"
          disabled={!user}
        />
      </FormContainer>
    </>
  );
};

export default CommentField;
