"use client";
import React from "react";
import { useSelector } from "react-redux";
import TagsInput from "../TagsInput/TagsInput";
import DescriptionInput from "../DescInput/DescriptionInput";
import TitleInput from "../TitleInput/TitleInput";

const PreviewPage = ({blog}) => {
  const updateValue = useSelector((state) => state.updateReducer.title);
   const updateDescription = useSelector((state) => state.updateReducer.description);
   const updateTag = useSelector((state) => state.updateReducer.Tag);
console.log(updateTag[0])
  return (
    <div className="container">
      <div className="mx-auto flex flex-col h-full sm:max-h-full max-h-[30vh] overflow-y-auto no-scrollbar">
        <TitleInput
          className="bg-gray-200 text-xl"
          row="1"
          labelText="Blog Title"
          title="name"
          defaultTitle={updateValue}
        />
        <DescriptionInput
          className="text-sm"
          updateValue={updateDescription}
        />
        <TagsInput updateValue={updateTag} blog={blog} />
      </div>
    </div>
  );
};

export default PreviewPage;
