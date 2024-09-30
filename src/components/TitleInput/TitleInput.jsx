"use client";
import TextAreaInput from "@/components/form/TextAreaInput";
import { useDispatch } from "react-redux";
import {
  handleTitleChange,
  UpdatehandleTitleChange,
} from "@/utils/reduxHelper";
import { useSelector } from "react-redux";

const TitleInput = ({
  row,
  name,
  className,
  labelText,
  iseditMode,
}) => {
  const createValue = useSelector((state) => state.blogReducer.title);
  const updateValue = useSelector((state) => state.updateReducer.title);
  const dispatch = useDispatch();

  const titleValue = iseditMode
    ? updateValue
    : createValue
    ? createValue
    : "Enter Title";
  return (
    <TextAreaInput
      labelText={labelText}
      name={name || "Title"}
      row={row || "2"}
      defaultValue={titleValue}
      value={titleValue}
      placeholder="Blog Title"
      className={` focus-visible:ring-none  outline-none border-none ${className} `}
      onChange={(e) =>
        iseditMode
          ? UpdatehandleTitleChange(e, dispatch)
          : handleTitleChange(e, dispatch)
      }
    />
  );
};

export default TitleInput;
