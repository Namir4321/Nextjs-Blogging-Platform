"use client";
import FormInput from "@/components/form/FormInput";
import TagsComponent from "@/components/TagsInput/TagsComponent";
import { handleAddTag } from "@/utils/reduxHelper";
import { useDispatch, useSelector } from "react-redux";
const TagsInput = () => {
  const tags = useSelector((state) => state.blogReducer.Tag);

  const dispatch = useDispatch();
  const handleKeyDown = (e) => {
    if (e.code === "Enter" || e.code === "Comma") {
      e.preventDefault();
      let tag = e.target.value;
      if (tags.length < 10) {
        handleAddTag(tag, dispatch);
      }else{
        return{message:"you can add max 10 tags"}
      }

      e.target.value=""
    }
  };
  return (
    <div className="rounded">
      <p>Topic - (Helps in Searching and ranking blog)</p>
      <div className="relative pl-2 py-2 pb-4 bg-gray-200 rounded">
        <FormInput
          label=" "
          name="tag"
          type="text"
          placeholder="Topic"
          onKeyDown={handleKeyDown}
          className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
        />

        {tags.map((tag, i) => {
        
          return <TagsComponent tag={tag} key={i} />;
        })}
      </div>
    </div>
  );
};

export default TagsInput;
