"use client";
import TitleInput from "@/components/TitleInput/TitleInput";
import EditorRedux from "@/components/EditorDiv/EditorRedux";
import BlogImageContainer from "@/components/editor/BlogImageContainer";
import { useSelector } from "react-redux";
const EditorPage = ({ iseditMode }) => {
  // const updateValue = useSelector((state) => state.updateReducer.banner);
  // const updatetitle = useSelector((state) => state.updateReducer.title);
  // const updateContent = useSelector((state) => state.updateReducer.content);

  return (
    <div className=" container relative ">
      <div className="mx-auto flex flex-col h-full sm:max-h-[60vh] max-h-[30vh] overflow-y-auto no-scrollbar">
        <BlogImageContainer
         
          iseditMode={iseditMode}
        />
        <TitleInput
          row="2"
          title="title"
          labelText=" "
          className=" sm:text-xl text-xl"
          iseditMode={iseditMode}
        />
        {/* id, data, readOnly,edit */}
        <EditorRedux
          id="previeweditors"
          // data={updateContent}
          readOnly={true}
          edit={true}
          iseditMode={iseditMode}
        />
        <hr className="w-full opacity-10 my-5" />
      </div>
    </div>
  );
};

export default EditorPage;
