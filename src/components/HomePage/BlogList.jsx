"use client"
import { useState } from "react";
import BlogCard from "@/components/Card/BlogCard";
import { Button } from "../ui/button";

const BlogList = ({ blogs }) => {
  const [visibleBlogs, setVisibleBlogs] = useState(4); 
  const loadMoreBlogs = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 4);
  };

  return (
    <section className="mt-4 gap-8 container">
      {blogs.slice(0, visibleBlogs).map((blog) => (
        <BlogCard key={blog.id} blog={blog}  />
      ))}

      {visibleBlogs < blogs.length && (
        <div className="flex  mt-8">
          <Button
            className="px-4 py-2   rounded-lg mb-6"
            onClick={loadMoreBlogs}
            variant="outline"
          >
            Load More
          </Button>
        </div>
      )}
    </section>
  );
};

export default BlogList;
