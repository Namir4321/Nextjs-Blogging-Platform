'use client'
import TextAreaInput  from "@/components/form/TextAreaInput";
import { useDispatch } from "react-redux";
import { handleTitleChange } from "@/utils/reduxHelper";
import { useSelector } from "react-redux";

const TitleInput = ({row,name,className,labelText}) => {
  const defaultValue = useSelector((state) => state.blogReducer.title);
  const dispatch = useDispatch();
  return (
    <TextAreaInput
      labelText={labelText}
      name={name||"Title"}
      row={row||"2"}
      defaultValue={defaultValue}
      value={defaultValue}
      placeholder="Blog Title"
      className={` focus-visible:ring-none  outline-none border-none ${className} `}
      onChange={(e) => handleTitleChange(e, dispatch)}
    />
  );
};

export default TitleInput;