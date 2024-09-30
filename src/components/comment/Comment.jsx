
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { FaRegCommentDots } from "react-icons/fa";
import CommentField from "@/components/comment/CommentField";
import CommentRender from "@/components/comment/CommentRender";
import { getAuthUser } from "@/utils/action";
const CommentBox = async({ blog }) => {
  const user=await getAuthUser()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="p-2 cursor-pointer">
          <FaRegCommentDots />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Comment</SheetTitle>
          <SheetDescription>{blog.title}</SheetDescription>
        </SheetHeader>
         
        <CommentField blog={blog}/>
        <CommentRender blogId={blog.id}/>
      </SheetContent>
    </Sheet>
  );
};

export default CommentBox;
