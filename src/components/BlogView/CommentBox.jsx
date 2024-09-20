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
import TextAreaInput from "@/components/form/TextAreaInput";
import { ButtonProp } from "../form/ButtonProp";
const CommentBox = ({blog}) => {
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
        <TextAreaInput row={5} placeholder="Leave a comment..." className="bg-gray-50 mb-2"/>
        <ButtonProp type="button" variant="default" text="comment" size="lg" className="mt-2"/>
      </SheetContent>
    </Sheet>
  );
};

export default CommentBox;
