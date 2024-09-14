import BlogCard from "@/components/Card/BlogCard";
const BlogList = ({blogs}) => {
  return (
  <section className="mt-4 gap-8 container">
    {blogs.map((blog)=>{
        return <BlogCard key={blog.id} blog={blog}/>
    })}
  </section>
  )
}

export default BlogList