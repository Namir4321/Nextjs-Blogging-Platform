"use client";
import PreviewPage from "@/components/preview/PreviewPage";
import EditorPage from "@/components/preview/EditorPage";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../form/FormContainer";
import TitleInput from "../TitleInput/TitleInput";
import { BlogSchema, validateWithZodSchema } from "@/utils/FormValidation";
import { createBlogAction, EditBlogAction, getAuthUser } from "@/utils/action";
import { handleReset } from "@/utils/reduxHelper";
import { redirect } from "next/navigation";

const Preview = ({ blog }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.blogReducer);
  const updatedRedux = useSelector((state) => state.updateReducer);
  const handlereduxdata = async () => {
    try {
      if (blog) {
        const profileId = await getAuthUser();
        const data = { ...updatedRedux, profileId };
        const validateFields = await validateWithZodSchema(BlogSchema, data);
         const submitBlog = await EditBlogAction(validateFields,blog);
          const reset = await handleReset(dispatch);
      } else {
        const profileId = await getAuthUser();
        const data = { ...reduxData, profileId };
        const validateFields = await validateWithZodSchema(BlogSchema, data);
        const submitBlog = await createBlogAction(validateFields);
        const reset = await handleReset(dispatch);
      }
    } catch (err) {
      console.log(err);
      toast({ variant: "destructive", description: err.message });
      return { messge: err.message };
    }
  };

  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Preview</Button>
        </DialogTrigger>

        <DialogContent className="w-full max-w-[1200px]">
          <DialogHeader>
            <DialogTitle>Preview</DialogTitle>
          </DialogHeader>
          <div className="container grid sm:grid-cols-2 place-items-center ">
            <EditorPage blog={blog} />
            <PreviewPage blog={blog} />
          </div>
          <DialogFooter className="gap-4">
            <Button variant="outline">Save as Draft</Button>
            <Button variant="default" onClick={handlereduxdata}>
              Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Preview;
