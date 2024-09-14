"use client";
import { useState, useEffect } from "react";
import BlogList from "@/components/HomePage/BlogList";
import Loading from "@/components/HomePage/Loading";
import { fetchBlogAction } from "@/utils/action";

const BlogContainer = ({ selectedTag }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const result = await fetchBlogAction(selectedTag); // Pass the selectedTag to filter blogs
        setBlogs(result);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedTag]); 

  if (loading) {
    return <Loading />; 
  }

  if (blogs.length === 0) {
    return <h6>No blogs found for the selected category...</h6>; 
  }

  return <BlogList blogs={blogs} />; 
};

export default BlogContainer;
