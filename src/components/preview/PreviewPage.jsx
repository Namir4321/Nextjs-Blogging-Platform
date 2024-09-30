"use client";
import React from "react";
import { useSelector } from "react-redux";
import TagsInput from "../TagsInput/TagsInput";
import DescriptionInput from "../DescInput/DescriptionInput";
import TitleInput from "../TitleInput/TitleInput";
import { useSearchParams } from "next/navigation";

const PreviewPage = ({blog,iseditMode}) => {
  // const updateValue = useSelector((state) => state.updateReducer.title);
  //  const updateDescription = useSelector((state) => state.updateReducer.description);
  //  const updateTag = useSelector((state) => state.blogReducer.Tag);
  
  return (
    <div className="container">
      <div className="mx-auto flex flex-col h-full sm:max-h-full max-h-[30vh] overflow-y-auto no-scrollbar">
        <TitleInput
          className="bg-gray-200 text-xl dark:bg-muted"
          row="1"
          labelText="Blog Title"
          title="name"
          iseditMode={iseditMode}
        />
        <DescriptionInput
          className="text-sm dark:bg-muted"
          iseditMode={iseditMode}
        />
        <TagsInput iseditMode={iseditMode} blog={blog} />
      </div>
    </div>
  );
};

export default PreviewPage;
