"use client";
import { Suspense, useState } from "react";
import TrendingContainer from "./TrendingContainer";
import { Button } from "../ui/button";
import { LoadingMainCard } from "@/components/HomePage/Loading";
import { useSearchParams } from "next/navigation";
const category = ["finance", "tech", "Techonology", "car", "AI", "Travel"];

const CategoryList = ({ setSelectedTag, selectedTag }) => {
  const [selectCategory, setSelectCategory] = useState(null);
  const pageParams = useSearchParams();
  const search = pageParams.get("search");
  const handleBlogByCategory = (e) => {
    const tag = e.target.innerText.toLowerCase();
    if (selectedTag !== tag) {
      setSelectedTag(tag);
      setSelectCategory(tag);
    } else {
      setSelectCategory("");
      setSelectedTag("home");
    }
  };

  return (
    <div className="flex gap-3 flex-wrap">
      {category.map((categories, i) => (
        <Button
          className={`p-3 rounded-full px-6 capitalize ${
            selectCategory === categories.toLowerCase() ? "" : "bg-gray-200"
          }`}
          key={i}
          onClick={handleBlogByCategory}
          variant={
            selectCategory === categories.toLocaleLowerCase()
              ? "default"
              : "ghost"
          }
        >
          {categories}
        </Button>
      ))}
    </div>
  );
};

export default CategoryList;
