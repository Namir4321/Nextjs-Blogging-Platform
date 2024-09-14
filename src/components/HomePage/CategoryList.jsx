"use client";
import { Suspense, useState } from "react";
import TrendingContainer from "./TrendingContainer";
import { Button } from "../ui/button";
import Loading from "@/components/HomePage/Loading";
const category = ["finance", "tech", "Techonology", "car", "AI"];

const CategoryList = ({ setSelectedTag }) => {
  const handleBlogByCategory = (e) => {
    const tag = e.target.innerText.toLowerCase();
    setSelectedTag(tag);
  };

  return (
    <div className="flex gap-3 flex-wrap">
      {category.map((categories, i) => (
        <Button
          className="p-3 bg-gray-200 rounded-full px-6 capitalize"
          key={i}
          onClick={handleBlogByCategory}
          variant="ghost"
        >
          {categories}
        </Button>
      ))}
      <Suspense fallback={<Loading />}>
        <TrendingContainer />
      </Suspense>
    </div>
  );
};

export default CategoryList;
