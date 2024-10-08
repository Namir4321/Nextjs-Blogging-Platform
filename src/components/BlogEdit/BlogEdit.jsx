import TitleInput from "@/components/TitleInput/TitleInput";
import EditorRedux from "@/components/EditorDiv/EditorRedux";
import EditNavbar from "@/components/editor/EditNavbar";
import { BlogImageAction, getProfileImage } from "@/utils/action";
import BlogImageContainer from "@/components/editor/BlogImageContainer";
const BlogEdit = ({ blog, iseditMode }) => {

  return (
    <section className="container">
      <EditNavbar blog={blog.id} iseditMode={iseditMode}/>
      <div className="mx-auto mt-4 max-w-[900px]">
        <BlogImageContainer
          defaultValue={blog.banner}
          iseditMode={iseditMode}
        />
        <TitleInput
          className="w-full  text-xl sm:text-2xl"
          row="3"
          labelText=" "
          defaultTitle={blog.title}
          iseditMode={iseditMode}
        />
        <hr className="w-full border-t border-gray-200" />
        <EditorRedux
          name="content"
          className="w-full"
          id="editeditor"
          data={blog.content}
          edit={true}
          iseditMode={iseditMode}
        />
      </div>
    </section>
  );
};

export default BlogEdit;
