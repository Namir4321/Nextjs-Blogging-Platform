'use client'
import { IoTrendingUpSharp } from "react-icons/io5";
import CategoryList from "@/components/HomePage/CategoryList";
import TrendingContainer from "./TrendingContainer";
import { Suspense } from "react";
import { LoadingTrendCard } from "@/components/HomePage/Loading";

const TrendingBlock = ({ setSelectedTag, selectedTag}) => {
  return (
    <>
      <div className="flex flex-col gap-10 ">
        <h1 className="font-medium text-xl mb-2 mt-2">
          Stories from all interest
        </h1>
        <CategoryList
          setSelectedTag={setSelectedTag}
          selectedTag={selectedTag}
        />
        <div className="">
          <h1 className="font-medium text-xl flex gap-1">
            trending
            <IoTrendingUpSharp className="" />
          </h1>
        </div>
        <Suspense fallback={<LoadingTrendCard />}>
          <TrendingContainer />
        </Suspense>
      </div>
    </>
  );
};

export default TrendingBlock;
