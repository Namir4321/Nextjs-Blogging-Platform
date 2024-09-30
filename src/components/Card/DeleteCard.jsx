import React from 'react'
import { DeleteBlogAction } from "@/utils/action";
import FormContainer from '../form/FormContainer';
import { Button } from '../ui/button';

const DeleteCard = ({BlogId}) => {
  const DeleteBlogPostAction = DeleteBlogAction.bind(null, { BlogId });
  return (
    <FormContainer action={DeleteBlogPostAction}>
      <Button className="text-red-500 underline " variant="icon" size="default">
        Delete
      </Button>
    </FormContainer>
  );
}

export default DeleteCard