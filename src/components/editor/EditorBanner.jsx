import Image from "next/image";
import TextAreaInput from "@/components/form/TextAreaInput";
import { BlogImageAction, getProfileImage } from "@/utils/action";
import BlogImageContainer from "@/components/editor/BlogImageContainer";
import { Button } from "../ui/button";
import TitleInput from "@/components/TitleInput/TitleInput";
import EditorRedux from "@/components/EditorDiv/EditorRedux";
import DescriptionInput from "@/components/DescInput/DescriptionInput";
import TagsInput from "@/components/TagsInput/TagsInput";
import Preview from "@/components/preview/Preview";
import EditNavbar from "@/components/editor/EditNavbar";
const EditorBanner = async ({ iseditMode }) => {
  const profile = await getProfileImage();
  return (
    <section className="container">
      <EditNavbar iseditMode={iseditMode} />
      <div className="mx-auto mt-4 max-w-[900px]">
        <BlogImageContainer iseditMode={iseditMode} />
        <TitleInput
          className="w-full  text-xl sm:text-2xl "
          row="3"
          labelText=" "
          iseditMode={iseditMode}
        />
        <hr className="w-full border-t border-gray-200 dark:border-muted" />
        <EditorRedux
          name="content"
          className="w-full dark:text-white"
          id="editorjs"
          iseditMode={iseditMode}
        />
      </div>
    </section>
  );
};

export default EditorBanner;
