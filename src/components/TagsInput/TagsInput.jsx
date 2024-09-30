"use client";
import FormInput from "@/components/form/FormInput";
import TagsComponent from "@/components/TagsInput/TagsComponent";
import { handleAddTag, handleAddTagEdit } from "@/utils/reduxHelper";
import { useDispatch, useSelector } from "react-redux";
const TagsInput = ({ blog, iseditMode }) => {
  const createtags = useSelector((state) => state.blogReducer.Tag);
  const updatedtags = useSelector((state) => state.updateReducer.Tag);
  const dispatch = useDispatch();
  const TagValue = iseditMode ? updatedtags : createtags ? createtags : "";

  const handleKeyDown = (e) => {
    if (e.code === "Enter" || e.code === "Comma") {
      e.preventDefault();
      let tag = e.target.value.toLowerCase();
      if (TagValue.length < 10) {
        handleAddTag(tag, dispatch);
        if (blog) {
          handleAddTagEdit(tag, dispatch);
        }
      } else {
        return { message: "you can add max 10 TagValue" };
      }

      e.target.value = "";
    }
  };
  return (
    <div className="rounded">
      <p>Topic - (Helps in Searching and ranking blog)</p>
      <div className="relative pl-2 py-2 pb-4 bg-gray-200 dark:bg-muted rounded">
        <FormInput
          label=" "
          name="tag"
          type="text"
          placeholder="Topic"
          onKeyDown={handleKeyDown}
          className="sticky input-box  bg-white top-0 left-0 pl-4 mb-3 dark:bg-muted focus:bg-white"
        />

        {TagValue.map((tag, i) => {
          return <TagsComponent tag={tag} key={i} blog={blog} />;
        })}
      </div>
    </div>
  );
};

export default TagsInput;
