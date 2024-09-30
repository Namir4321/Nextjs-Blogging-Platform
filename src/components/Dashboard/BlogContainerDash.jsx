import { fetchBlogAction, fetchBlogFilterAction } from "@/utils/action";
import DashBlogCard from "@/components/Card/DashBlog";

const BlogContainerDash = async () => {
  const Blog = await fetchBlogFilterAction(false);
  if (Blog.length === 0) {
    return <div className="container bg-gray-100">No Blog published yet</div>;
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
