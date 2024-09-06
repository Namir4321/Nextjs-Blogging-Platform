import Image from "next/image";
import TextAreaInput from "@/components/form/TextAreaInput";
import { BlogImageAction, getProfileImage } from "@/utils/action";
import BlogImageContainer from "@/components/editor/BlogImageContainer";
import dynamic from "next/dynamic";
const EditorBox = dynamic(() => import("@/components/editor/EditorBox"), {
  ssr: false,
});
const EditorBanner = async() => {
  const profile=await getProfileImage();
  return (
    <section>
      <div className="mx-auto max-w-[900px] w-full">
        <BlogImageContainer/>
        <TextAreaInput labelText=" " name="Title" placeholder="Blog Title"className="text-3xl no-shadow no-outline mt-2"/>
        <hr className="w-full opacity-10 my-5"/>
      <EditorBox className="w-full"/>
      </div>
    </section>
  );
};

export default EditorBanner;
