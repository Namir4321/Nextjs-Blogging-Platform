"use client";
import TitleInput from "@/components/TitleInput/TitleInput";
import EditorRedux from "@/components/EditorDiv/EditorRedux";
import BlogImageContainer from "@/components/editor/BlogImageContainer";
const EditorPage = () => {
  return (
    <div className=" container relative ">
      <div className="mx-auto flex flex-col h-full sm:max-h-[60vh] max-h-[30vh] overflow-y-auto no-scrollbar">
        <BlogImageContainer />
        <TitleInput row="2" title="title" labelText=" " className=" sm:text-xl text-xl" />
        <EditorRedux id="previeweditor" />
        <hr className="w-full opacity-10 my-5" />
      </div>
    </div>
  );
};

export default EditorPage;
