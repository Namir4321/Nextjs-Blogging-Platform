import { fetchBlogAction } from "@/utils/action";
import DashBlogCard from "@/components/Card/DashBlog";

const BlogContainerDash = async () => {
  const Blog = await fetchBlogAction(false);
  if (Blog.length > 0) {
    <div className="bg-gray-100">No Blog published yet</div>;
  }
  return (
    <div className="container">
      {Blog.map((item) => (
        <DashBlogCard Blog={item} key={item.id} />
      ))}
    </div>
  );
};

export default BlogContainerDash;
