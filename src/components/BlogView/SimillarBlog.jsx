import { fetchSimillarBlog } from "@/utils/action";
import BlogList from "../HomePage/BlogList";

const SimillarBlog = async ({ blog }) => {
  const simillar = await fetchSimillarBlog(
    blog.Tag,
    blog.title,
    blog.description,
    blog.id
  );
  if (simillar) {
    return (
      <>
        <h1 className="text-2xl mt-14 mb-10 font-medium">Simillar Blogs</h1>
        <BlogList blogs={simillar} />
      </>
    );
  }
};

export default SimillarBlog;
