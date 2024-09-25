"use client";
import { useState, useEffect } from "react";
import BlogList from "@/components/HomePage/BlogList";
import { LoadingMainCard } from "@/components/HomePage/Loading";
import { fetchBlogAction, fetchBlogWithFilterAction } from "@/utils/action";
import { activeTabRef } from "@/components/InPageNavigation/InPageNavigation";
import { useSearchParams } from "next/navigation";

const BlogContainer = ({ selectedTag }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        activeTabRef.current.click();
        if (selectedTag === "home") {
          const result = await fetchBlogAction();
          setBlogs(result);
         
        }
        if (selectedTag !== "home") {
          const result = await fetchBlogWithFilterAction(selectedTag);
          setBlogs(result);
        }
        if (search) {
          const result = await fetchBlogWithFilterAction(selectedTag, search);
          setBlogs(result);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedTag, search]);

  if (loading) {
    return <LoadingMainCard />;
  }
  if (blogs.length === 0) {
    return (
      <h6 className="flex items-center justify-center bg-gray-100 ">
        No blogs published for the selected category...
      </h6>
    );
  }

  return <BlogList blogs={blogs} />;
};

export default BlogContainer;
