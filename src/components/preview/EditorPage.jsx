"use client";
import TitleInput from "@/components/TitleInput/TitleInput";
import EditorRedux from "@/components/EditorDiv/EditorRedux";
import BlogImageContainer from "@/components/editor/BlogImageContainer";
import { useSelector } from "react-redux";
const EditorPage = () => {
  const updateValue = useSelector((state) => state.updateReducer.banner);
   const updatetitle = useSelector((state) => state.updateReducer.title);
  const updateContent = useSelector((state) => state.updateReducer.content);
  console.log(updateContent)
  return (
    <div className=" container relative ">
      <div className="mx-auto flex flex-col h-full sm:max-h-[60vh] max-h-[30vh] overflow-y-auto no-scrollbar">
        <BlogImageContainer defaultValue={updateValue} />
        <TitleInput
          row="2"
          title="title"
          labelText=" "
          className=" sm:text-xl text-xl"
          defaultTitle={updatetitle}
        />
        {/* id, data, readOnly,edit */}
        <EditorRedux
          id="previeweditors"
          data={updateContent}
          readOnly={true}
          edit={true}
        />
        <hr className="w-full opacity-10 my-5" />
      </div>
    </div>
  );
};

export default EditorPage;
