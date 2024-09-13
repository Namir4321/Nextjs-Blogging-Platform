"use client";
import React from "react";
import { useSelector } from "react-redux";
import TagsInput from "../TagsInput/TagsInput";
import DescriptionInput from "../DescInput/DescriptionInput";
import TitleInput from "../TitleInput/TitleInput";

const PreviewPage = () => {
  return (
    <div className="container">
      <div className="mx-auto flex flex-col h-full sm:max-h-full max-h-[30vh] overflow-y-auto no-scrollbar">
        <TitleInput
          className="bg-gray-200 text-xl"
          row="1"
          labelText="Blog Title"
          title="name"
        />
        <DescriptionInput className="text-sm" />
        <TagsInput />
      </div>
    </div>
  );
};

export default PreviewPage;
