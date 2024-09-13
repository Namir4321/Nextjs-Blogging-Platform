"use client";
import TextAreaInput from "@/components/form/TextAreaInput";
import { useDispatch } from "react-redux";
import { handleDescChange } from "@/utils/reduxHelper";
import { useSelector } from "react-redux";

const DescriptionInput = ({className,labelText,title,row}) => {
  const dispatch = useDispatch();
  const defaultValue = useSelector((state) => state.blogReducer.des);
  return (
    <div className="rounded mt-3">
      <p>Short Descrption about your blog</p>
      <div className="relative pl-2 py-2 pb-4 bg-gray-200 rounded-md">
        <TextAreaInput
          labelText={labelText}
          name={title}
          row={row}
          defaultValue={defaultValue}
          placeholder="this is a short descrption"
          className={`focus-visible:ring-none outline-none border-none ${className}`}
          onChange={(e) => handleDescChange(e, dispatch)}
        />
      </div>
    </div>
  );
};

export default DescriptionInput;
