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
import {
  BlogSchema,
  DraftSchema,
  validateWithZodSchema,
} from "@/utils/FormValidation";
import {
  createBlogAction,
  createDraftAction,
  EditBlogAction,
  getAuthUser,
  UpdateDraftAction,
} from "@/utils/action";
import { handleReset, handleResetEdit } from "@/utils/reduxHelper";
import { redirect } from "next/navigation";
import { VscPreview } from "react-icons/vsc";

const Preview = ({ blog, iseditMode }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.blogReducer);
  const updatedRedux = useSelector((state) => state.updateReducer);
  const handlereduxdata = async () => {
    try {
      if (blog) {
        const profileId = await getAuthUser();
        const data = { ...updatedRedux, profileId };
        console.log(blog)
        const validateFields = await validateWithZodSchema(BlogSchema, data);
        const submitBlog = await EditBlogAction(validateFields, blog);
        const reset = await handleResetEdit(dispatch);
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

  const handlesavedraft = async () => {
    if (blog) {
      const profileId = await getAuthUser();
      const data = { ...updatedRedux, profileId, draft: true };
      const validateFields = await validateWithZodSchema(DraftSchema, data);
      const submitBlog = await UpdateDraftAction(validateFields,blog);
    const reset = await handleResetEdit(dispatch);
    } else {
      const profileId = await getAuthUser();
      const data = { ...reduxData, profileId, draft: true };
      const validateFields = await validateWithZodSchema(DraftSchema, data);
      const submitBlog = await createDraftAction(validateFields);
      const reset = await handleReset(dispatch);
    }
  };
  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" size="default">
            <VscPreview className="mr-2" />
            Preview
          </Button>
        </DialogTrigger>

        <DialogContent className="w-full max-w-[1200px]">
          <DialogHeader>
            <DialogTitle>Preview</DialogTitle>
          </DialogHeader>
          <div className="container grid sm:grid-cols-2 place-items-center ">
            <EditorPage blog={blog} iseditMode={iseditMode} />
            <PreviewPage blog={blog} iseditMode={iseditMode} />
          </div>
          <DialogFooter className="gap-4">
            <Button variant="outline" onClick={handlesavedraft}>
              Save as Draft
            </Button>
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
