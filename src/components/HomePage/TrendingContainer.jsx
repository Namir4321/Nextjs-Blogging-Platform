"use client";
import { useState, useEffect } from "react";
import { LoadingTrendCard } from "@/components/HomePage/Loading";
import TrendingList from "@/components/HomePage/TrendingList";
import { fetchtrendingBlogAction } from "@/utils/action";

const TrendingContainer = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingBlogs = async () => {
      try {
        setLoading(true);
        const data = await fetchtrendingBlogAction();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching trending blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingBlogs();
  }, []); 
  if (loading) {
    return <LoadingTrendCard />;
  }

  if (blogs.length === 0) {
    return <h6>No trending blogs found</h6>;
  }

  return <TrendingList blogs={blogs} />;
};

export default TrendingContainer;
