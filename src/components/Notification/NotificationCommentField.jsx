import { postCommentReply } from "@/utils/action";
import FormContainer from "../form/FormContainer";
import TextAreaInput from "../form/TextAreaInput";
import { ButtonProp } from "../form/ButtonProp";

const NotificationCommentField = ({ notification }) => {
  return (
    <div className=" container w-full ">
      <FormContainer action={postCommentReply}>
        <TextAreaInput row="2" name="comment" labelText=" " className="bg-gray-100" />
        <input
          type="hidden"
          name="blogId"
          value={notification.blog.id}
        />
        <input type="hidden" name="replyingto" value="true" />
        <input type="hidden" name="parentId" value={notification.comment.id} />
        <input
          type="hidden"
          name="blogAuthor"
          value={notification.blog.profileId}
        />
        <ButtonProp
          type="submit"
          variant="default"
          text="comment"
          size="lg"
          className="mt-2"
          
        />
      </FormContainer>
    </div>
  );
};

export default NotificationCommentField;
