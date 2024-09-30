import { fetchSingleBlogPost } from "@/utils/action";
import BlogEdit from "@/components/BlogEdit/BlogEdit";

const BlogEditPage = async ({ params }) => {
  const blog = await fetchSingleBlogPost(params.id);
  return <BlogEdit blog={blog} iseditMode={true} />;
};

export default BlogEditPage;
