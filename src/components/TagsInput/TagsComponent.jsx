"use client";
import { handleRemoveTag, handleEditTag, handleRemoveTagEdit, handleEditTagEdit } from "@/utils/reduxHelper";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { useState } from "react";
const TagsComponent = ({ tag,blog }) => {
  const [oldTag, setOldTag] = useState(tag);
  const dispatch = useDispatch();
  const handleTag = () => {
    handleRemoveTag(tag, dispatch);
    if(blog){
      handleRemoveTagEdit(tag, dispatch);
    }
  };
  const handleTargetEdit = (e) => {
    if (e.code === "Enter" || e.code === "Comma") {
      e.preventDefault();
      let newTag = e.target.innerText;
      if (newTag && newTag !== oldTag) {
        handleEditTag(oldTag, newTag, dispatch);
        if(blog){
          handleEditTagEdit((oldTag, newTag, dispatch));
        }
      }
      e.target.setAttribute("contentEditable", false);
    }
  };
  const handleEditable = (e) => {
    e.target.setAttribute("contentEditable", true);
    e.target.focus();
  };
  return (
    <div className="relative  p-2 mt-2 mr-2 px-5 dark:bg-muted bg-white rounded-full inline-block hover:bg-opacity-50 pr-12">
      <p
        className="outline-none"
        onKeyDown={handleTargetEdit}
        onClick={handleEditable}
      >
        {tag}
      </p>
      <Button
        size="icon"
        variant="ghost"
        className="mt-[2px] rounded-full absolute right-3 top-1/2 -translate-y-1/2 "
        onClick={handleTag}
      >
        <X className="text-sm pointer-events-none" />
      </Button>
    </div>
  );
};

export default TagsComponent;
